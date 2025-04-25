function generateRandomXml({ rootElement, childCount }) {
    let xml = `<${rootElement}>`;
    const usedElements = new Set();

    for (let i = 0; i < childCount; i++) {
        let element;
        do {
            element = getRandomElement();
        } while (usedElements.has(element));

        usedElements.add(element);
        xml += `<${element}>SampleValue${i + 1}</${element}>`;
    }

    xml += `</${rootElement}>`;
    return xml;
}

const sampleElements = [
    'name', 'email', 'phone', 'address', 'city', 'state', 'country', 'zip', 'company', 'position',
    'department', 'website', 'note', 'date', 'time', 'price', 'quantity', 'description', 'status'
];

function getRandomElement() {
    return sampleElements[Math.floor(Math.random() * sampleElements.length)];
}

module.exports.templateTags = [
    {
        name: 'randomXmlForJson',
        displayName: 'Random XML for JSON',
        description: 'Generate valid XML samples ready to be used inside a JSON property.',
        args: [
            {
                displayName: 'Root Element',
                type: 'string',
                defaultValue: 'root',
            },
            {
                displayName: 'Number of Child Elements',
                type: 'number',
                defaultValue: 3,
            },
        ],
        async run(context, rootElement, childCount) {
            // Generate random XML
            const xml = generateRandomXml({
                rootElement,
                childCount,
            });

            // Escape double quotes for JSON compatibility
            return xml.replace(/"/g, '\\"');
        },
    },
];