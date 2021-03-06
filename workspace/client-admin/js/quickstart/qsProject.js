/***************************************
* Copyright 2010-2013 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
* 
* This file is part of SITools2.
* 
* SITools2 is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
* 
* SITools2 is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
* 
* You should have received a copy of the GNU General Public License
* along with SITools2.  If not, see <http://www.gnu.org/licenses/>.
***************************************/
/*global Ext, sitools, ID, i18n, document, showResponse, alertFailure*/
Ext.namespace('sitools.admin.quickStart');

sitools.admin.quickStart.qsProject = Ext.extend(Ext.Panel, {
    forceLayout : true, 
    layout : "vbox",
    border : false, 
    layoutConfig : {
        align : 'center',
        pack : 'start'
    },
    bodyCssClass : 'quickStart',
    initComponent : function () {
        
        var title = new Ext.form.Label({
            cls : 'qs-h1',
            html : i18n.get('label.qsProjectTitle'),
            listeners : {
                render : function (img) {
                    img.getEl().fadeIn({
                        easing : 'easeIn',
                        duration: 1
                    });
                }
            }
        });
        
        var desc = new Ext.form.Label({
            cls : 'qs-div',
            id : "start-desc",
            html : i18n.get('label.qsProjectDesc'),
            listeners : {
                render : function (desc) {
                   desc.getEl().fadeIn({
                       easing : 'easeIn',
                       duration: 1
                   });
               }
            }
        });
        
        var img = new Ext.form.Label({
            html : '<img id="qs-projet" class="qs-image" src="/sitools/client-admin/res/html/quickStart/screenshots/projects.png"/>',
            listeners : {
                scope : this,
                afterrender : function (img) {
                    Ext.get("qs-projet").on('load', function () {
                        
                        img.getEl().fadeIn({
                            endOpacity: 1,
                            easing : 'easeIn',
                            duration: 1,
                            useDisplay : true
                        });
                        img.getEl().alignTo("start-desc", "tl-bl");
                        
                        var imgProjet = new Ext.form.Label({
                            html : '<img id="qs-projet-logo" class="bouton_action" src="/sitools/client-admin/res/html/quickStart/icons/project-logo.png"/>',
                            tooltip : new Ext.ToolTip({
                                html : "Open Project"
                            }),
                            listeners : {
                                scope : this,
                                render : function (imgProjet) {
                                    imgProjet.getEl().fadeIn({
                                        endOpacity: 1,
                                        easing : 'easeIn',
                                        duration: 1.5,
                                        useDisplay : true
                                    });
                                    
                                },
                                afterrender : function (imgProjet) {
                                    Ext.get("qs-projet-logo").on('load', function () {
                                        
                                        imgProjet.getEl().on('mouseleave', function (e, t, o) {
                                           t.src = "/sitools/client-admin/res/html/quickStart/icons/project-logo.png"; 
                                        });
                                        imgProjet.getEl().on('mouseenter', function (e, t, o) {
                                            t.src = "/sitools/client-admin/res/html/quickStart/icons/project-logo-hover.png"; 
                                        });
                                        imgProjet.getEl().on('click', function (e, t, o) {
                                            this.qs.openFeature("projectsNodeId");
                                        }, this);
                                        
                                        imgProjet.getEl().alignTo("qs-projet", "br-br", [50, 40]);
                                        
                                        new Ext.ToolTip({
                                            target : 'qs-projet-logo',
                                            anchor: 'left',
                                            autoShow : true,
                                            showDelay : 0,
                                            html : "<b>Open Project</b>"
                                        });
                                        
                                    }, this);
                                }
                            }
                        });
                        this.add(imgProjet);
                        this.doLayout();
                        
                    }, this);
                }
            }
        });
        
        this.items = [title, desc, img];
        
        sitools.admin.quickStart.qsProject.superclass.initComponent.call(this);
    }
});
