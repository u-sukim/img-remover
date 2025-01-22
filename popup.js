const input = document.getElementById('input');
const addButton = document.getElementById('btn');
const list = document.getElementById('uls');

chrome.storage.local.get(['rules'], (result) => {
    const rules = result.rules || [];
    rules.forEach(addRuleToUI);
});

addButton.addEventListener('click', () => {
    const value = input.value.trim();
    if (!value || (!value.startsWith('id:') && !value.startsWith('class:'))) {
        alert('Please enter a valid rule (e.g., id:image or class:logo)');
        return;
    }

    chrome.storage.local.get(['rules'], (result) => {
        const rules = result.rules || [];
        if (!rules.includes(value)) {
            rules.push(value);
            chrome.storage.local.set({ rules }, () => {
                addRuleToUI(value);
                input.value = ''; // Clear input
            });
        } else {
            alert('Rule already exists!');
        }
    });
});

function addRuleToUI(rule) {
    const li = document.createElement('li');
    li.textContent = rule;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeRule(rule, li));
    li.appendChild(removeButton);
    list.appendChild(li);
}

function removeRule(rule, listItem) {
    chrome.storage.local.get(['rules'], (result) => {
        const rules = result.rules || [];
        const updatedRules = rules.filter((r) => r !== rule);
        chrome.storage.local.set({ rules: updatedRules }, () => {
            listItem.remove();
        });
    });
}
