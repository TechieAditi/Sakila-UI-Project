
// PRS CODE
Ext.define("StudentDataModel", {
	extend: "Ext.data.Model",
	fields: [
		{ name: "Title", mapping: "Title" },
		{ name: "Description", mapping: "Description" },
		{ name: "Release_Year", mapping: "Release_Year" },
		{ name: "Language", mapping: "Language" },
		{ name: "Director_Name", mapping: "Director_Name" }
	]
});

Ext.onReady(function() {
	// Store data
	var myData = [
		{
			Title: "Academy Dinosaur",
			Description: "all about dinosaur",
			Release_Year: "2006",
			Language: "English",
			Director_Name: "Nolan"
		},
		{
			Title: "Academy Dinosaur",
			Description: "all about dinosaur",
			Release_Year: "2006",
			Language: "English",
			Director_Name: "Nolan"
		},
		{
			Title: "Academy Dinosaur",
			Description: "all about dinosaur",
			Release_Year: "2006",
			Language: "English",
			Director_Name: "Nolan"
		},
		{
			Title: "New Dinosaur",
			Description: "all about dinosaur",
			Release_Year: "2006",
			Language: "English",
			Director_Name: "Nolan"
		},
		{
			Title: "Academy Dinosaur",
			Description: "all about dinosaur",
			Release_Year: "2006",
			Language: "English",
			Director_Name: "Nolan"
		},
		{
			Title: "Academy Dinosaur",
			Description: "all about dinosaur",
			Release_Year: "2006",
			Language: "English",
			Director_Name: "Nolan"
		},
		{
			Title: "Academy Dinosaur",
			Description: "all about dinosaur",
			Release_Year: "2006",
			Language: "English",
			Director_Name: "Nolan"
		},
		{
			Title: "Academy Dinosaur",
			Description: "all about dinosaur",
			Release_Year: "2006",
			Language: "English",
			Director_Name: "Nolan"
		},
		{
			Title: "Academy Dinosaur",
			Description: "all about dinosaur",
			Release_Year: "2006",
			Language: "English",
			Director_Name: "Nolan"
		},
		{
			Title: "Academy Dinosaur",
			Description: "all about dinosaur",
			Release_Year: "2006",
			Language: "English",
			Director_Name: "Nolan"
		},
		{
			Title: "Academy Dinosaur",
			Description: "all about dinosaur",
			Release_Year: "2006",
			Language: "English",
			Director_Name: "Nolan"
		},
		{
			Title: "Academy Dinosaur",
			Description: "all about dinosaur",
			Release_Year: "2006",
			Language: "English",
			Director_Name: "Nolan"
		},
		{
			Title: "Academy Dinosaur",
			Description: "all about dinosaur",
			Release_Year: "2006",
			Language: "English",
			Director_Name: "Nolan"
		},
		{
			Title: "Academy Dinosaur",
			Description: "all about dinosaur",
			Release_Year: "2006",
			Language: "English",
			Director_Name: "Nolan"
		},
		{
			Title: "Academy Dinosaur",
			Description: "all about dinosaur",
			Release_Year: "2006",
			Language: "English",
			Director_Name: "Nolan"
		}
	];

	// Creation of first grid store
	var gridStore = Ext.create("Ext.data.Store", {
		model: "StudentDataModel",
		pageSize: 10,
		proxy: {
			type: "memory",
			enablePaging: true
		},
		data: myData
	});

	// Creation of first grid

	var states = Ext.create("Ext.data.Store", {
		fields: ["abbr", "name"],
		data: [
			{ abbr: "AL", name: "Alabama" },
			{ abbr: "AK", name: "Alaska" },
			{ abbr: "AZ", name: "Arizona" }
		]
	});
	Ext.create("Ext.form.Panel", {
		// Don't want content to crunch against the borders
		title: "Advance Search",
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
				handler: function() {
					f.updateRecord(record);
					f.close();
				}
			},
			{
				text: "Reset",
				id: "reset",
				disabled: true,
				iconCls: "fa fa-refresh",
				handler: function() {
					f.close();
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

						style: { marginLeft: "270px", marginTop: "20px" },
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
								store = Ext.ComponentQuery.query("grid")[0].getStore();

								if (!Ext.isEmpty(store)) {
									store.clearFilter();

									if (!Ext.isEmpty(f1)) {
										var regEx = new RegExp(f1, "i"),
											fields = [
												"Title",
												"Description",
												"Release Year",
												"Language",
												"Director Name"
											],
											i;
										store.filterBy(function(rec) {
											for (i = 0; i < fields.length; i++) {
												if (regEx.test(rec.get([fields[i]]))) {
													return true;
												}
											}
										});
									}
								}
							}
						}
					},
					{
						xtype: "textfield",
						fieldLabel: "Director Name",
						style: { marginLeft: "100px", marginTop: "20px" }
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
						// Don
						xtype: "datefield",
						fieldLabel: "Release Year",
						style: { marginLeft: "270px", marginTop: "10px" }
					},
					{
						xtype: "combobox",
						style: { marginLeft: "100px", marginTop: "10px" },
						fieldLabel: "Language",
						store: states,
						queryMode: "local",
						displayField: "name",
						valueField: "abbr"
					}
				]
			}
		] // auto is one of the layout type.
	});
	var grid = Ext.create("Ext.grid.Panel", {
		renderTo: Ext.getBody(),
		title: "Movie Grid",
		extend: Ext.ux.LiveSearchGridPanel,
		store: gridStore,
		pageSize: 7,
		selModel: Ext.create("Ext.selection.CheckboxModel"),

		width: "100%",

		border: true,
		columns: [
			{
				text: "Title",
				dataIndex: "Title",
				flex: 1,
				editor: {
					xtype: "textfield"
				}
			},
			{
				header: "Description",
				dataIndex: "Description",
				editor: {
					xtype: "textfield"
				},
				flex: 1
			},
			{
				header: "Release Year",
				dataIndex: "Release_Year",
				editor: {
					xtype: "textfield"
				},
				flex: 1
			},
			{
				header: "Language",
				dataIndex: "Language",
				editor: {
					xtype: "textfield"
				},
				flex: 1
			},
			{
				header: "Director Name",
				dataIndex: "Director_Name",
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
		]
	});
});
