import './hello-world-button.scss';

class HelloWorldButton {
    btnCssClass = 'hello-world-button';
    render() {
        const button = document.createElement('button');
        button.innerHTML = 'Hello World';
        button.classList.add('hello-world-button');
        const body = document.querySelector('body');
        button.onclick = () => {
            const p = document.createElement('p');
            p.innerHTML = 'Hello World';
            p.classList.add(this.btnCssClass);
            body.appendChild(p);
        }
        body.appendChild(button);
    }
}

export default HelloWorldButton;