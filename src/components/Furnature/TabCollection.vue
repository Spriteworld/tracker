<template>
    <div class="h-full">
        <ul
            class="list-none flex"
            :class="[
                staticClass && staticClass.header || 'flex-row px-4 pt-2',
                {
                    'bg-product-color-lighter': !darkMode,
                    'bg-gray-600': darkMode,
                }
            ]"
        >
            <li
                class="mr-1"
                v-for="(tab, i) in tabs"
                :key="i"
                v-show="tab.isVisible"
            >
                <a v-html="tab.header"
                   @click="selectTab(tab.hash, $event)"
                   :href="tab.hash"
                   :class="[
                        staticClass && staticClass.tab || 'float-left py-2 px-4 text-sm rounded-t truncate',
                        {
                           '-mb-px text-product-color': tab.isActive,
                           'opacity-50 hover:text-product-color': !tab.isActive,
                           'text-gray-400 cursor-not-allowed': tab.isDisabled,
                           'bg-white': !darkMode,
                           'bg-gray-800': darkMode,
                       }
                   ]"
                   data-turbolinks="false"
                ></a>
            </li>
        </ul>
        <div class="tabs-component-panels" style="height: calc(100% - 44px);" :class="[staticClass && staticClass.content || 'px-4 py-8']">
            <slot/>
        </div>
    </div>
</template>

<script>
import expiringStorage from '../Helpers/expiringStorage';
import {mapActions, mapState} from 'vuex'

export default {
    props: {
        cacheLifetime: {
            default: 5,
        },
        options: {
            type: Object,
            required: false,
            default: () => ({
                useUrlFragment: true,
                defaultTabHash: null,
            }),
        },
        staticClass: {
            type: Object,
            required: false
        },
        forceDark: {
            type: Boolean,
            required: false,
            default: false
        },
        ignoreSwitch: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    data: () => ({
        tabs: [],
        activeTabHash: '',
        activeTabIndex: 0,
        lastActiveTabHash: '',
    }),

    computed: {
        storageKey() {
            return `vue-tabs-component.cache.${window.location.host}${window.location.pathname}`;
        },
        darkMode() {
            return this.forceDark === true || this.framework.dark_mode === true;
        },
        ...mapState({
            'refresh_data': function (state) {
                return state.framework.refresh_data;
            },
            'framework': state => state.framework,
            'active_tab': state => state.local_settings.active_tab,
        }),
    },

    created() {
        this.tabs = this.$children;
    },

    mounted() {
        window.addEventListener('hashchange', () => this.selectTab(window.location.hash));

        if (this.findTab(window.location.hash)) {
            this.selectTab(window.location.hash);
            return;
        }

        const previousSelectedTabHash = expiringStorage.get(this.storageKey);

        if (this.findTab(previousSelectedTabHash)) {
            this.selectTab(previousSelectedTabHash);
            return;
        }

        if (this.options.defaultTabHash !== null && this.findTab("#" + this.options.defaultTabHash)) {
            this.selectTab("#" + this.options.defaultTabHash);
            return;
        }

        //Select the first tab
        if (this.tabs.length) {
            this.selectTab(this.tabs[0].hash);
        }
    },

    methods: {
        findTab(hash) {
            return this.tabs.find(tab => tab.hash === hash);
        },

        selectTab(selectedTabHash, event) {
            // See if we should store the hash in the url fragment.
            if (event && !this.options.useUrlFragment) {
                event.preventDefault();
            }

            const selectedTab = this.findTab(selectedTabHash);
            if (!selectedTab) {
                return;
            }

            if (selectedTab.isDisabled) {
                event.preventDefault();
                return;
            }

            if (this.lastActiveTabHash === selectedTab.hash) {
                this.$emit('tabs-clicked', selectedTab);
                return;
            }

            this.tabs.forEach(tab => {
                tab.isActive = (tab.hash === selectedTab.hash);
            });

            this.$emit('tabs-changed', selectedTab);

            if (selectedTab.id && !this.ignoreSwitch) {
                this.setActiveTab(selectedTab.id);
            }

            this.activeTabHash = selectedTab.hash;
            this.activeTabIndex = this.getTabIndex(selectedTabHash);

            this.lastActiveTabHash = this.activeTabHash = selectedTab.hash;

            expiringStorage.set(this.storageKey, selectedTab.hash, this.cacheLifetime);
        },

        setTabVisible(hash, visible) {
            const tab = this.findTab(hash);
            if (!tab) {
                return;
            }

            tab.isVisible = visible;
            if (tab.isActive) {
                // If tab is active, set a different one as active.
                tab.isActive = visible;

                this.tabs.every((tab, index, array) => {
                    if (tab.isVisible) {
                        tab.isActive = true;
                        return false;
                    }

                    return true;
                });
            }
        },

        getTabIndex(hash) {
            const tab = this.findTab(hash);

            return this.tabs.indexOf(tab);
        },

        getTabHash(index) {
            const tab = this.tabs.find(tab => this.tabs.indexOf(tab) === index);

            if (!tab) {
                return;
            }

            return tab.hash;
        },

        getActiveTab() {
            return this.findTab(this.activeTabHash);
        },

        getActiveTabIndex() {
            return this.getTabIndex(this.activeTabHash);
        },

        ...mapActions({
            setActiveTab: 'local_settings/setActiveTab',
        }),
    },
};
</script>
