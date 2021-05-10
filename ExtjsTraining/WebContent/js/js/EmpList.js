var grid, selection;
var Lang_id, ratingSelected;
var selectedrowId = [];
var rowIds;
var featureSelected = [];
Ext.define("MovieDataModel", {
	extend: "Ext.data.Model",
	fields: [
		{ name: "title", mapping: "title" },
		{ name: "description", mapping: "description" },
		{ name: "release_year", mapping: "release_year" },
		{ name: "language_name", mapping: "language_name" },
		{ name: "director", mapping: "director" },
		{ name: "rating", mapping: "rating" },
		{ name: "special_features", mapping: "special_features" }
	]
}); // created a class for data Model

Ext.define("LanguageListModel", {
	extend: "Ext.data.Model",
	fields: [
		{ name: "language_name", mapping: "Language" }
	]
});

Ext.define("RatingListModel", {
	extend: "Ext.data.Model",
	fields: [{ name: "rating", mapping: "rating" }]
});
Ext.define("FeaturesListModel", {
	extend: "Ext.data.Model",
	fields: [{ name: "special_features", mapping: "special_features" }]
});

Ext.onReady(function() {
	// data in json format from ajax

	// Creation of first grid store
	var gridStore = Ext.create("Ext.data.Store", {
		model: "MovieDataModel",
		pageSize: 15,
		autoLoad: false,
		proxy: {
			type: "ajax",
			url: "MovieServlet",
			enablePaging: true,
			reader: {
				type: "json",
				rootProperty: "Movies",
				totalProperty: "total"
			}
		}
	});
	gridStore.load({ params: { start: 0, limit: 15 } });

	var languageList = Ext.create("Ext.data.Store", {
		model: "LanguageListModel",
		autoLoad : false,
		proxy: {
			type: "ajax",
			url: "LanguageServlet",
			reader: {
				type: "json",
				rootProperty: "Languages",
				totalProperty: "total"
			}
		}
	});
	languageList.load();

	var ratingList = Ext.create("Ext.data.Store", {
		model: "RatingListModel",
		proxy: {
			type: "ajax",
			url: "RatingServlet",
			reader: {
				type: "json",
				rootProperty: "ratings",
				totalProperty: "total"
			}
		}
	});
	ratingList.load();

	var featuresList = Ext.create("Ext.data.Store", {
		model: "FeaturesListModel",
		proxy: {
			type: "ajax",
			url: "FeatureServlet",
			reader: {
				type: "json",
				rootProperty: "features",
				totalProperty: "total"
			}
		}
	});
	featuresList.load();
	console.log(languageList);
	console.log(gridStore);
	console.log(featuresList);
	console.log(ratingList);
	// Creation of store for combobox
	Ext.create("Ext.form.Panel", {
		// Don't want content to crunch against the borders
		//form panel for advance search
		title: "Movie Advance Search",
		renderTo: Ext.getBody(),
		height: 250,
		width: "100%",
		border: true,
		frame: true,
		layout: "vbox",
		buttonAlign: "center",
		buttons: [
			{
				text: "Search",
				id: "search",
				disabled: true,
				iconCls: "fa fa-search",
				handler: function(button) {
					var form = button.up("form").getForm();
					var movieQuery = button
						.up("form")
						.getForm()
						.findField("MovieName")
						.getValue();
					var directorQuery = button
						.up("form")
						.getForm()
						.findField("DirectorName")
						.getValue();
					var yearQuery = button
						.up("form")
						.getForm()
						.findField("ReleaseYear")
						.getValue();
					var languageQuery = button
						.up("form")
						.getForm()
						.findField("Language")
						.getValue();
					console.log(movieQuery, directorQuery, yearQuery, languageQuery);
					store = Ext.ComponentQuery.query("grid")[0].getStore();

					if (!Ext.isEmpty(store)) {
						store.clearFilter();

						if (
							!Ext.isEmpty(movieQuery) ||
							!Ext.isEmpty(directorQuery) ||
							!Ext.isEmpty(yearQuery) ||
							!Ext.isEmpty(languageQuery)
						) {
							var SearchgridStore = Ext.create("Ext.data.Store", {
								model: "MovieDataModel",
								autoLoad: false,
								proxy: {
									type: "ajax",
									url: "SearchServlet",
									enablePaging: true,
									reader: {
										type: "json",
										rootProperty: "Movies",
										totalProperty: "total"
									}
								}
							});
							SearchgridStore.load({
								params: {
									title: movieQuery,
									director: directorQuery,
									release_year: yearQuery,
									language_id: Lang_id
								}
							});
							console.log(SearchgridStore);
							grid.reconfigure(SearchgridStore);
							Ext.getCmp("pagingTool").bindStore(SearchgridStore);
						}
					}
				}
			},
			{
				text: "Reset",
				id: "reset",
				disabled: true,
				iconCls: "fa fa-refresh",
				handler: function(button) {
					button
						.up("form")
						.getForm()
						.reset();
					store.clearFilter();
					grid.reconfigure(gridStore);
					Ext.getCmp("pagingTool").bindStore(gridStore);
				}
			}
		],
		items: [
			{
				xtype: "container",
				layout: {
					type: "hbox"
				},
				flex: 2,
				items: [
					{
						xtype: "textfield",
						fieldLabel: "Movie Name",
						id: "MovieName",

						style: { marginLeft: "240px", marginTop: "20px" },
						listeners: {
							change: function(thisField) {
								console.log("HERE");
								var f1 = thisField.getValue();
								if (f1 != "") {
									Ext.getCmp("search").setDisabled(false);
									Ext.getCmp("reset").setDisabled(false);
								} else {
									Ext.getCmp("reset").setDisabled(true);
									Ext.getCmp("search").setDisabled(true);
								}
							}
						}
					},
					{
						xtype: "textfield",
						fieldLabel: "Director Name",
						id: "DirectorName",
						style: { marginLeft: "180px", marginTop: "20px" },
						listeners: {
							change: function(thisField) {
								console.log("HERE");
								var f1 = thisField.getValue();
								//Check the Value?//
								// Ext.get('save').setDisabled(true);
								if (f1 != "") {
									Ext.getCmp("search").setDisabled(false);
									Ext.getCmp("reset").setDisabled(false);
								} else {
									Ext.getCmp("reset").setDisabled(true);
									Ext.getCmp("search").setDisabled(true);
								}
							}
						}
					}
				]
			},
			{
				xtype: "container",
				layout: {
					type: "hbox"
				},
				flex: 2,
				items: [
					{
						xtype: "numberfield",
						fieldLabel: "Release Year",
						id: "ReleaseYear",
						minValue: 1970,
						maxValue: 2006,
						validator: function(val) {
							if (!Ext.isEmpty(val) && val >= 1970 && val <= 2006) {
								return true;
							} else {
								return "Release year should be between 1970-2006";
							}
						},
						style: { marginLeft: "240px", marginTop: "10px" },
						listeners: {
							change: function(thisField) {
								console.log("HERE");
								var f1 = thisField.getValue();
								//Check the Value?//
								// Ext.get('save').setDisabled(true);
								if (f1 != "") {
									Ext.getCmp("search").setDisabled(false);
									Ext.getCmp("reset").setDisabled(false);
								} else {
									Ext.getCmp("reset").setDisabled(true);
									Ext.getCmp("search").setDisabled(true);
								}
							}
						}
					},
					{
						
						xtype: "combobox",
						style: { marginLeft: "180px", marginTop: "10px" },
						fieldLabel: "Language",
						id: "Language",
						store: languageList,
						displayField: "language_name",
						valueField: "language_name",
						listeners: {
							change: function(thisField) {
								console.log("HERE");
								var f1 = thisField.getValue();
								//Check the Value?//
								// Ext.get('save').setDisabled(true);
								if (f1 != "") {
									Ext.getCmp("search").setDisabled(false);
									Ext.getCmp("reset").setDisabled(false);
								} else {
									Ext.getCmp("reset").setDisabled(true);
									Ext.getCmp("search").setDisabled(true);
								}
							},
							
											select: function(combo, record, index) {
												Lang_id = record.data["language_id"]; //**** Id variable could be Global
												console.log(Lang_id);
												console.log(languageList);
												
											},
											
						}
					}
				]
			}
		]
	});
	//Movie grid
	var grid = Ext.create("Ext.grid.Panel", {
		renderTo: Ext.getBody(),
		title: "Movie Grid",
		pageSize: 5,
		store: gridStore,
		selModel: Ext.create("Ext.selection.CheckboxModel"),

		width: "100%",

		border: true,
		columns: [
			{
				text: "Title",
				dataIndex: "title",
				editor: {
					xtype: "textfield"
				},
				flex: 1
			},
			{
				header: "Description",
				dataIndex: "description",
				editor: {
					xtype: "textfield"
				},
				flex: 1
			},
			{
				header: "Release Year",
				dataIndex: "release_year",
				editor: {
					xtype: "numberfield",
					minValue: 1970,
					maxValue: 2006,
					validator: function(val) {
						if (!Ext.isEmpty(val) && val >= 1970 && val <= 2006) {
							return true;
						} else {
							return "Release year should be between 1970-2006";
						}
					}
				},
				flex: 1
			},
			{
				header: "Language",
				dataIndex: "language_name",
				editor: {
					xtype: "textfield"
				},
				flex: 1
			},
			{
				header: "Director",
				dataIndex: "director",
				editor: {
					xtype: "textfield"
				},
				flex: 1
			},
			{
				header: "Rating",
				dataIndex: "rating",
				editor: {
					xtype: "textfield"
				},
				flex: 1
			},
			{
				header: "Special Features",
				dataIndex: "special_features",
				editor: {
					xtype: "textfield"
				},
				flex: 1
			}
		],

		plugins: [
			Ext.create("Ext.grid.plugin.RowEditing", {
				clicksToEdit: 1
			})
		],
		listeners: {
			selectionchange: function(grid, selected, eOpts) {
				console.log(selected);
				if (selected.length > 0) {
					selectedrowId = [];
					Ext.each(selected, function(select) {
						console.log(select.data)
						selectedrowId.push(select.data.film_id.toString());
					});
					rowIds = selectedrowId.join(",");
					console.log(rowIds);
				}
			}
		},

		dockedItems: [
			{
				xtype: "pagingtoolbar",
				id : "pagingTool",
				store: gridStore, // same store GridPanel is using
				dock: "top",
				displayInfo: true,
				items: [
					{
						xtype: "button",
						iconCls: "fa fa-plus-circle",
						text: "Add",
						tooltip: "Add New Record",
						handler: function() {
							let grid = this.up("grid"),
								store = grid.getStore();
							var f = Ext.create("Ext.form.Panel", {
								xtype: "formpanel",
								title: "Add Record",
								width: 550,
								height: 450,
								floating: true,
								centered: true,
								closable: true,
								modal: true,
								frame: true,
								buttonAlign: "center",
								buttons: [
									{
										text: "Save",
										id: "save",
										iconCls: "x-fa fa-check",
										disabled: true,
										handler: function(button, e) {
											var form = button.up("form").getForm();
											console.log(ratingSelected);
											console.log(
												Ext.getCmp("featureSelected_id")
													.getValue()
													.join()
											);
											console.log(Lang_id);
											Ext.Ajax.request({
												url: "InsertMovieListServlet", // your backend url
												method: "POST",
												params: {
													title: form.getValues().title,
													description: form.getValues().description,
													release_year: form.getValues().release_year,
													language_id: Lang_id,
													rating: ratingSelected,
													special_features: Ext.getCmp(
														"featureSelected_id"
													)
														.getValue()
														.join(),
													director: form.getValues().director
												}
											});
											grid.reconfigure(gridStore);
								            grid.getStore().reload()
											f.close();
										}
									},
									{
										text: "Cancel",
										iconCls: "x-fa fa-close",
										handler: function() {
											f.close();
										}
									}
								],
								items: [
									{
										xtype: "textfield",
										name: "title",
										fieldLabel: "title",
										width: "95%",
										listeners: {
											change: function(thisField) {
												console.log("HERE");
												var f1 = thisField.getValue();
												//Check the Value?//
												// Ext.get('save').setDisabled(true);
												if (f1 != "") {
													Ext.getCmp("save").setDisabled(false);

												}
											}
										}
									},

									{
										xtype: "numberfield",
										name: "release_year",
										fieldLabel: "Release Year",
										width: "95%",
										validator: function(val) {
											if (!Ext.isEmpty(val) && val >= 1970 && val <= 2006) {
												return true;
											} else {
												return "Release year should be between 1970-2006";
											}
										}
									},

									{
										xtype: "combobox",
										id: "featureSelected_id",
										store: featuresList,
										width: "95%",
										fieldLabel: "special_features",
										displayField: "special_features",
										valueField: "special_features",
										multiSelect: true,
										tpl: new Ext.XTemplate(
											'<tpl for=".">',
											'<div class="x-boundlist-item">',
											'<input type="checkbox" />',
											"{special_features}",
											"</div>",
											"</tpl>"
										),
										listeners: {
											select: function(combo, records) {
												var node;
												console.log(records);
												Ext.each(records, function(rec) {
													node = combo.getPicker().getNode(rec);
													/*Ext.get(node).down('input').set({
                            checked: true
                        });*/
													console.log(rec);
													Ext.get(node).down("input").dom.checked = true;
												});
											},
											beforedeselect: function(combo, rec) {
												var node = combo.getPicker().getNode(rec);

												/*Ext.get(node).down('input').set({
                        checked: undefined
                    });*/
												Ext.get(node).down("input").dom.checked = false;
											}
										}
									},
									{
										xtype: "combobox",
										width: "95%",
										store: ratingList,
										fieldLabel: "rating",
										displayField: "rating",
										valueField: "rating",
										listeners: {
											select: function(combo, record, index) {
												ratingSelected = record.data.rating; //**** Id variable could be Global
											}
										}
									},
									{
										xtype: "combobox",
										fieldLabel: "Language",
										width: "95%",
										store: languageList,
										displayField: "language_name",
										valueField: "language_name",
										listeners: {
											select: function(combo, record, index) {
												Lang_id = record.data["language_id"];
												console.log(Lang_id); //**** Id variable could be Global
											}
										}
									},
									{
										xtype: "textfield",
										name: "director",
										fieldLabel: "Director",
										width: "95%"
									},
									{
										xtype: "textarea",
										name: "description",
										fieldLabel: "description",
										width: "95%"
									}
								]
							});
							f.show();
						}
					},
					{
						text: "Edit",
						iconCls: "fa fa-pencil-square-o",
						handler: function() {
							grid = this.up("grid");
							store = grid.getStore();
							selection = grid
								.getView()
								.getSelectionModel()
								.getSelection()[0];
							rowInd = selection.data.film_id;

							console.log(rowInd);
							featureSelected = selection.data.special_features;
							//grid.findPlugin("rowediting").startEdit(selection);
							var f = Ext.create("Ext.form.Panel", {
								xtype: "formpanel",
								title: "Edit Record",
								width: 550,
								height: 450,
								floating: true,
								centered: true,
								modal: true,
								frame: true,
								buttonAlign: "center",
								buttons: [
									{
										text: "Update",
										iconCls: "x-fa fa-check",
										handler: function(button, e) {
											var form = button.up("form").getForm();
											featureSelected = Ext.getCmp("featureSelected_id")
												.getValue()
												.join();
											if (ratingSelected == undefined)
												ratingSelected = selection.data.rating;
											if (featureSelected == undefined)
												featureSelected = selection.data.special_features;
											if (Lang_id == undefined) {
												Lang_id = languageList.findBy(function(record) {
													return (
														record.data.language_name ==
														selection.data.language_name
													);
												});
												Lang_id += 1;
											}
											console.log(form.getValues().release_year);
											console.log(form.getValues().title);
											console.log(form.getValues().description);
											console.log(ratingSelected);
											console.log(featureSelected);
											console.log(Lang_id);
											console.log(rowInd);
											f.updateRecord(selection);

											Ext.Ajax.request({
												url: "EditMovieListServlet", // your backend url
												method: "POST",
												params: {
													film_id: rowInd,
													title: form.getValues().title,
													description: form.getValues().description,
													release_year: form.getValues().release_year,
													rating: ratingSelected,
													language_id: Lang_id,
													rating: ratingSelected,
													special_features: Ext.getCmp(
														"featureSelected_id"
													)
														.getValue()
														.join(),
													director: form.getValues().director
												}
											});
											grid.reconfigure(gridStore);

											f.close();
										}
									},
									{
										text: "Cancel",
										iconCls: "x-fa fa-close",
										handler: function() {
											f.close();
										}
									}
								],
								items: [
									{
										xtype: "textfield",
										name: "title",
										width: "95%",
										fieldLabel: "title"
									},
									{
										xtype: "numberfield",
										name: "release_year",
										width: "95%",
										fieldLabel: "Release Year"
									},

									{
										xtype: "combobox",
										id: "featureSelected_id",
										store: featuresList,
										width: "95%",
										autoSelect: true,
										fieldLabel: "special_features",
										displayField: "special_features",
										valueField: "special_features",
										multiSelect: true,
										tpl: new Ext.XTemplate(
											'<tpl for=".">',
											'<div class="x-boundlist-item">',
											'<input type="checkbox" />',
											"{special_features}",
											"</div>",
											"</tpl>"
										),
										listeners: {
											select: function(combo, records) {
												var node;

												Ext.each(records, function(rec) {
													node = combo.getPicker().getNode(rec);
													console.log(rec);
													/*Ext.get(node).down('input').set({
                            checked: true
                        });*/

													Ext.get(node).down("input").dom.checked = true;
												});
											},
											beforedeselect: function(combo, rec) {
												var node = combo.getPicker().getNode(rec);

												/*Ext.get(node).down('input').set({
                        checked: undefined
                    });*/
												Ext.get(node).down("input").dom.checked = false;
											},
											afterrender: function(combo) {
												combo.setValue(featureSelected.split(","));
											},
											expand: function(combo) {
												featureSelected = combo.getValue();
												console.log(featureSelected);
												if (featureSelected != "") {
													//combo.reset()
													console.log("here");
													featureSelected.forEach(function(item, index) {
														var rec = combo.findRecordByValue(item);
														console.log(rec);
														var node = combo.picker.getNode(rec);
														console.log(node);
														Ext.get(node).down(
															"input"
														).dom.checked = true;
													});
												}
											}
										}
									},
									{
										xtype: "combobox",

										store: ratingList,
										width: "95%",
										fieldLabel: "rating",
										displayField: "rating",
										valueField: "rating",
										autoSelect: true,
										listeners: {
											select: function(combo, record, index) {
												ratingSelected = record.data.rating; //**** Id variable could be Global
											},
											afterrender: function(combo) {
												combo.setValue(selection.data.rating);
												console.log(selection.data.rating);
											}
										}
									},
									{
										xtype: "combobox",
										fieldLabel: "Language",
										width: "95%",
										store: languageList,
										displayField: "language_name",
										valueField: "language_name",
										listeners: {
											select: function(combo, record, index) {
												Lang_id = record.data["language_id"]; //**** Id variable could be Global
												console.log(Lang_id);
												console.log(languageList);
												
											},
											afterrender: function(combo) {
												combo.setValue(selection.data.language_name);
											}
										}
									},
									{
										xtype: "textfield",
										width: "95%",
										name: "director",
										fieldLabel: "Director"
									},
									{
										xtype: "textarea",
										name: "description",
										width: "95%",
										fieldLabel: "description"
									}
								]
							});
							f.show();
							f.loadRecord(selection);
						}
					},
					{
						text: "Delete",
						iconCls: "fa fa-minus-circle",
						handler: function() {
							var grid = this.up("grid");
							store = grid.getStore();
							console.log("here", rowIds);
							var selection = grid
								.getView()
								.getSelectionModel()
								.getSelection();

							if (selection) {
								store.remove(selection);
								Ext.toast("Row/s Deleted");
						
								grid.reconfigure(gridStore);
								grid.getStore().reload()
						
							
							Ext.Ajax.request({
								url: "DeleteMovieListServlet", // your backend url
								method: "POST",
								params: {
									film_id: rowIds
								}
							});

							
						}
						}
					}
				],
				displayMsg: "Displaying {0} to {1} of {2} &nbsp;records ",
				emptyMsg: "No records to display&nbsp;"
			}
		]
	});
});
