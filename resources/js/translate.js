export default function translate(name) {
    const translate = {
        name: "Name",
        text: "Text",
        type: "Type",
        data: "Action data",
        command: "Command",
        signature: "Signature"
    };

    return translate[name];
}

