/*******************************************************************************
 * Copyright 2010-2013 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 * 
 * This file is part of SITools2.
 * 
 * SITools2 is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 * 
 * SITools2 is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with
 * SITools2. If not, see <http://www.gnu.org/licenses/>.
 ******************************************************************************/
/*
 * global Ext, sitools, ID, i18n, document, showResponse, alertFailure,
 * LOCALE,ImageChooser, loadUrl, extColModelToStorage
 */

Ext.namespace('sitools.user.component.dataviews.services');

/**
 * GUI Service to display dataset current selection for ordering
 * 
 * @required datasetId
 * @required datasetUrl
 * @cfg {Ext.data.JsonStore} the store where nodes are saved
 * @class sitools.user.component.dataviews.services.displaySelectionCartService
 * @extends Ext.Window
 */
sitools.user.component.dataviews.services.displaySelectionCartService = {

    getCartSelectionFile : function (response) {
        if (Ext.isEmpty(response.responseText)) {
            return;
        }
        try {
            var json = Ext.decode(response.responseText);
            this.cartSelectionFile = json;
        } catch (err) {
            return;
        }
    },

    getCart : function () {
        userStorage.get(this.user + "_CartSelections.json", "/" + DEFAULT_ORDER_FOLDER + "/records", this, this.getCartSelectionFile, Ext.emptyFn, this.displaySelectionCart);
    },

    displaySelectionCart : function () {
        var ranges = null;
        var startIndex = 0;
        
        if(this.cartSelectionFile) {
            Ext.each(this.cartSelectionFile.cartSelections, function (sel) {
                if (sel.selectionName === this.dataview.datasetName) {
                    ranges = sel.ranges;
                    startIndex = sel.startIndex;
                    return false;
                }
            }, this);
        }
        this.dataview.getSelectionModel().clearSelections();
        this.dataview.ranges = ranges;
        this.dataview.startIndex = startIndex;
        this.dataview.store.load({
            params : {
                start : startIndex,
                limit : DEFAULT_LIVEGRID_BUFFER_SIZE
            },
            scope : this.dataview
        });
    }
};
Ext.reg('sitools.user.component.dataviews.services.displaySelectionCartService', sitools.user.component.dataviews.services.displaySelectionCartService);

sitools.user.component.dataviews.services.displaySelectionCartService.getParameters = function () {
    return [];
};
/**
 * @static Implementation of the method executeAsService to be able to launch
 *         this window as a service.
 * @param {Object}
 *            config contains all the service configuration
 */
sitools.user.component.dataviews.services.displaySelectionCartService.executeAsService = function (config) {

    if (Ext.isEmpty(userLogin)) {
        alert("You need to be connected");
        return;
    }
    
    Ext.apply(this, config);

    (Ext.isEmpty(userLogin)) ? this.user = "public" : this.user = userLogin;

    this.getCart();

};