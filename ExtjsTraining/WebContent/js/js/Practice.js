
// final code
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
			{ abbr: "English", name: "English" },
			{ abbr: "Hindi", name: "Hindi" },
			{ abbr: "Arabic", name: "Arabic" }
		]
	});
	Ext.create("Ext.form.Panel", {
		// Don't want content to crunch against the borders
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
							Ext.isEmpty(directorQuery) ||
							Ext.isEmpty(yearQuery) ||
							Ext.isEmpty(languageQuery)
						) {
							store.filterBy(function(rec) {
								return (
									rec.get("Title") === movieQuery &&
									rec.get("Director_Name") === directorQuery &&
									rec.get("Release_Year") ===
										(yearQuery ? yearQuery : 0).toString() &&
									rec.get("Language") === languageQuery
								);
							});
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

						style: { marginLeft: "270px", marginTop: "20px" },
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
						style: { marginLeft: "100px", marginTop: "20px" },
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
						// Don
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
						style: { marginLeft: "270px", marginTop: "10px" },
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
						style: { marginLeft: "100px", marginTop: "10px" },
						fieldLabel: "Language",
						id: "Language",
						store: states,
						queryMode: "local",
						displayField: "name",
						valueField: "abbr",
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
