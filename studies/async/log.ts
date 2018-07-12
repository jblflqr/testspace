const log = (content) => {
    let p = document.createElement("p");
    p.innerHTML = content;
    document.body.appendChild(p);
};

const Logger = {
    container: 'div[id=log]',
    log: content => {
        let el = document.createElement("div");
        el.innerHTML = content;
        document.querySelector(Logger.container).appendChild(el);
    },
    clear: () => {
        document.querySelector(Logger.container).innerHTML = '';
    }
}