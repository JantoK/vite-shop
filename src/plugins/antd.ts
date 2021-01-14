import { App } from 'vue';
import { Button, Form, Input, Card } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

export function setupAntd(app: App<Element>) {
    app.use(Button)
       .use(Input)
       .use(Card)
       .use(Form);
}
