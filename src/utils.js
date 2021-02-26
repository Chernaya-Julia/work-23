export const addClasses = (el, classes = []) => {
    const newElement = el.cloneNode();
    newElement.classList.add(...classes);
    return newElement;
}

export const appendChildren = (el, children = []) => {
    const newElement = el.cloneNode();
    children.forEach((child) => {
        if (child !== null && typeof child !== 'object') {
            newElement.append(document.createTextNode(child))
        } else if (child !== null) {
            newElement.append(child);
        }
    });
    return newElement;
}

export const element = (tagName, 
    {children = [], classNames = [], listeners = {}, ...additionalProps}
) => appendChildren(
    addClasses(document.createElement(tagName), classNames),
    children
);

export const div = (props) => element('div', props)
