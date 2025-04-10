module.exports = {
    formatDate: (date) => {
        return date.toLocaleDateString();
    },

    formatTime: (date) => {
        let text = date.toLocaleTimeString().split(":");
        let t2 = text.pop().split(" ")[1];
        text = text.join(':') + " " + t2;
        return text;
    }

}