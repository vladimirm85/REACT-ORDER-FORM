import { observable, action, computed } from "mobx";

export default class HomeStore {

    @observable products = [];

    constructor (RootStore) {
        this.RootStore = RootStore;
        this.requests = this.RootStore.requests;
    };

    @action getProducts() {
        this.RootStore.serverResponse.setServerResponseStatus('pending');
        this.requests.products.getProducts().then((products) => {
                this.products = products;
                this.RootStore.serverResponse.setServerResponseError(false);
            }).catch(() => {
                this.RootStore.notifications.addNotification('getProducts');
                this.RootStore.serverResponse.setServerResponseError(true);
            }).finally(() => {
                this.RootStore.serverResponse.setServerResponseStatus('fulfilled');
        });
    };

    @action updateServerResponseStatus(status) {
        this.serverResponseStatus = status;
    };

    @computed get getServerResponseStatus() {
        return this.serverResponseStatus;
    };

    getServerResponseError() {
        return this.serverResponseError;
    };
};