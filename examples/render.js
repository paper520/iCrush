export default {
    render: function (createElement) {
        createElement("div", {}, [
            createElement("label", {
                "for": "''"
            }, [
                createElement("测试"),
            ]),
            createElement("input", {
                "class": "'itc'",
                "id": "'itd'"
            }, []),
            createElement("文本"),
            createElement("ul", {}, [
                createElement("li", {}, [
                    createElement("1"),
                ]),
                createElement("li", {}, [
                    createElement("2"),
                ]),
                createElement("li", {}, [
                    createElement("3"),
                ]),
            ]),
        ])
    },
    data() {
        return {};
    }
};
