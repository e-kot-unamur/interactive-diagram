import App from './App.svelte';

const app = new App({
    target: document.body,
    props: {
        version: '2.0'
    }
});

export default app;