chrome.storage.local.get(['rules'], (data) => {
    const rules = data.rules || [];
    rules.forEach((rule) => {
        if (rule.startsWith('id:')) {
            const idValue = rule.replace('id:', '').trim();
            const element = document.getElementById(idValue);
            if (element) {
                element.remove();
                console.log(`Removed element with id: ${idValue}`);
            }
        } else if (rule.startsWith('class:')) {
            const classValue = rule.replace('class:', '').trim();
            const elements = document.querySelectorAll(`.${classValue}`);
            elements.forEach((el) => {
                el.remove();
                console.log(`Removed element with class: ${classValue}`);
            });
        }
    });
});
