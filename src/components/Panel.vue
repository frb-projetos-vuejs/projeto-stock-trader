<template>
        <b-col sm="12" md="4" class="panel-margin">
            <b-card bg-variant="info" text-variant="white">
                <span slot="header">
                    <i v-if="getStock.id === 0" :class="getStock.icon"></i>
					<font-awesome-icon v-else :icon="['fab', getStock.icon]" />
                    {{ company }}
                </span>
                <b-row>
                    <b-col sm="12" md="8">
                        <b-form-group label="Quantidade">
                            <b-form-input id="qtde" min="0" type="number" v-model="amount"></b-form-input>
                            <b-form-text id="description"><strong>Preço:</strong> {{getStock.price | money}}. <strong>Total:</strong> {{getStock.price * amount | money}}.</b-form-text>
                        </b-form-group>
                    </b-col>
                    <b-col sm="12" md="4" class="d-flex align-items-center btn-margin">
                        <b-button :disabled="buttonState || amount < 1" variant="info" @click="isBuy ? buyStock() : sellStock()">{{ isBuy ? 'Comprar' : 'Vender' }}</b-button>
                    </b-col>
                    <b-col cols="12">
                        <b-alert class="small" v-show="buttonState" show variant="danger">{{ isBuy ? 'Saldo insuficiente!' : 'Quantidade insuficiente de ações.' }}</b-alert>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>
</template>

<script>
export default {
    props: ['company', 'isBuy'],
    data() {
        return {
            amount: 0,
        }
    },
    computed: {
        getStock() {
            return this.$store.getters.getStock(this.company)
        },
        getOwned() {
            return this.$store.getters.getInventory.owned[this.company]
        },
        getCash() {
            return this.$store.getters.getCash
        },
        buttonState() {
            if (this.isBuy) {
                if (this.getStock.price * this.amount > this.getCash) {
                    return true
                } else {
                    return false
                }
            } else {
                if (this.amount > this.getOwned) {
                    return true
                } else {
                    return false
                }
            }
        }
    },
    methods: {
        buyStock() {
            let total = this.$store.getters.getStock(this.company).price * this.amount
            this.$store.dispatch('stockOperation', { company: this.company, isBuy: true, total, content: parseInt(this.amount) })
            this.messageToast(`Foram compradas ${this.amount} ações da empresa ${this.company}.`, 'info')
            this.amount = 0
        },
        sellStock() {
            let total = this.$store.getters.getStock(this.company).price * this.amount
            this.$store.dispatch('stockOperation', { company: this.company, isBuy: false, total, content: parseInt(this.amount) })
            this.messageToast(`Foram vendidas ${this.amount} ações da empresa ${this.company}.`, 'success')
            this.amount = 0
        },
        messageToast(message, variant) {
            this.$bvToast.toast(message, {
                title: 'Operação realizada',
                variant: variant,
                toaster: 'b-toaster-bottom-center',
                solid: false
            })
        }
    },
}
</script>

<style scoped>

.panel-margin {
    margin-bottom: 30px;
}

#qtde {
    border: 1px solid #FFF;
    color: #FFF;
    background: rgba(255, 255, 255, 0.2);
}

#description {
    color: white !important;
}

.btn-margin {
    margin-top: -5px;
}

</style>
