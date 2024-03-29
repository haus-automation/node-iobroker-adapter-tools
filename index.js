'use strict';

const utils = require('@iobroker/adapter-core');

module.exports = class AdapterToolsBase extends utils.Adapter {
    removeNamespace(id) {
        const re = new RegExp(this.namespace + '*\\.', 'g');
        return id.replace(re, '');
    }

    isNewerVersion(oldVer, newVer) {
        const oldParts = oldVer.split('.');
        const newParts = newVer.split('.');

        for (let i = 0; i < newParts.length; i++) {
            const a = ~~newParts[i];
            const b = ~~oldParts[i];
            if (a > b) return true;
            if (a < b) return false;
        }

        return false;
    }

    logSensitive(msg) {
        let newMsg = msg;
        for (const attr of this.ioPack.protectedNative) {
            newMsg = (typeof msg === 'string' && this.config[attr]) ? msg.replace(this.config[attr], `**config.${attr}**`) : msg;
        }
        this.log.debug(newMsg);
	}
};
