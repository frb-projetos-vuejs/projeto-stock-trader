import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        archive: {
            inventory: {
                cash: 10000,
                owned: {
                    BMW: 0,
                    Google: 0,
                    Apple: 0,
                    Twitter: 0,
                    Microsoft: 0,
                    YouTube: 0
                },
                history: {
                    BMW: { bought: 0, sold: 0, profit: 0, expenses: 0 },
                    Google: { bought: 0, sold: 0, profit: 0, expenses: 0 },
                    Apple: { bought: 0, sold: 0, profit: 0, expenses: 0 },
                    Twitter: { bought: 0, sold: 0, profit: 0, expenses: 0 },
                    Microsoft: { bought: 0, sold: 0, profit: 0, expenses: 0 },
                    YouTube: { bought: 0, sold: 0, profit: 0, expenses: 0 }
                }
            },
            stocks: {
                BMW: { id: 0, price: 220, icon: 'car-bmw' },
                Google: { id: 1, price: 200, icon: 'google' },
                Apple: { id: 2, price: 170, icon: 'apple' },
                Twitter: { id: 3, price: 120, icon: 'twitter' },
                Microsoft: { id: 4, price: 280, icon: 'microsoft' },
                YouTube: { id: 5, price: 260, icon: 'youtube' },
            },
            day: 1
        },
    },
    getters: {
        getState(state) {
            return state.archive
        },
        getInventory(state) {
            return state.archive.inventory
        },
        getCash(state) {
            return state.archive.inventory.cash
        },
        getOwnedStocks(state) {
            return state.archive.inventory.owned
        },
        getStock: (state) => (company) => {
            return state.archive.stocks[company]
        },
        getStocks(state) {
            return state.archive.stocks
        },
        getHistory(state) {
            return state.archive.inventory.history
        },
        getDay(state) {
            return state.archive.day
        }
    },
    mutations: {
        loadState(state, payload) {
            state.archive = payload
        },
        setStock(state, payload) {
            if (payload.isBuy) {
                state.archive.inventory.owned[payload.company] += payload.content
            } else {
                state.archive.inventory.owned[payload.company] -= payload.content
            }
            
        },
        setPrice(state, payload) {
            state.archive.stocks = payload
        },
        setDay(state, payload) {
            state.archive.day += payload
        },
        setHistory(state, payload) {
            if (payload.isBuy) {
                state.archive.inventory.history[payload.company].bought += payload.content
                state.archive.inventory.history[payload.company].expenses += payload.total
            } else {
                state.archive.inventory.history[payload.company].sold += payload.content
                state.archive.inventory.history[payload.company].profit += payload.total
            }
        },
        setCash(state, payload) {
            state.archive.inventory.cash += payload
        }
    },
    actions: {
        stockOperation(context, payload) {
            if (payload.isBuy) {
                context.commit('setCash', -(payload.total))
            } else {
                context.commit('setCash', (payload.total))
            }
            context.commit('setStock', payload)
            context.commit('setHistory', payload)
        },
        randomizePrices(context) {
            let stocks = context.getters.getStocks
            let minDec = -30
            let maxInc = 45
            let minPrice = 20
            for (var key in stocks) {
                let rand = Math.random()
                stocks[key].price += Math.floor(Math.random() * (rand > 0.5 ? maxInc : minDec))
                stocks[key].price = (stocks[key].price < minPrice ? minPrice : stocks[key].price)
            }
            context.commit('setPrice', stocks)
            context.commit('setDay', 1)
        },
        loadState(context, payload) {
            context.commit('loadState', payload)
        }
    }
})