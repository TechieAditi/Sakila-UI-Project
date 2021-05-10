Ext.define("StudentDataModel", {
	extend: "Ext.data.Model",
	fields: [
		{ name: "InvoiceId", mapping: "InvoiceId" },
		{ name: "Product", mapping: "Product" },
		{ name: "Amount", mapping: "Amount" },
		{ name: "Status", mapping: "Status" }
	]
});

Ext.onReady(function() {
	var panel1 = Ext.create("Ext.panel.Panel", {
		bodyPadding: 7, // Don't want content to crunch against the borders
		width: 300,
		title: "WorkList",
		items: [
			{
				xtype: "datefield",
				fieldLabel: "Start date"
			},
			{
				xtype: "datefield",
				fieldLabel: "End date"
			}
		]
	});
	// Store data
	var myData = [
		{ InvoiceId: "1234", Product: "ABC", Amount: "26,500", Status: "0" },
		{ InvoiceId: "4567", Product: "XYZ", Amount: "11,500", Status: "1" },
		{ InvoiceId: "8912", Product: "CDE", Amount: "5,500", Status: "0" },
		{ InvoiceId: "5432", Product: "FGH", Amount: "27,000", Status: "1" },
		{ InvoiceId: "7654", Product: "LMNO", Amount: "50,000", Status: "1" },
		{ InvoiceId: "4567", Product: "XYZ", Amount: "11,500", Status: "1" },
		{ InvoiceId: "8912", Product: "CDE", Amount: "5,500", Status: "0" },
		{ InvoiceId: "5432", Product: "FGH", Amount: "27,000", Status: "1" },
		{ InvoiceId: "7654", Product: "LMNO", Amount: "50,000", Status: "1" },
		{ InvoiceId: "4567", Product: "XYZ", Amount: "11,500", Status: "1" },
		{ InvoiceId: "8912", Product: "CDE", Amount: "5,500", Status: "0" },
		{ InvoiceId: "5432", Product: "FGH", Amount: "27,000", Status: "1" },
		{ InvoiceId: "7654", Product: "LMNO", Amount: "50,000", Status: "1" },
		{ InvoiceId: "4567", Product: "XYZ", Amount: "11,500", Status: "1" },
		{ InvoiceId: "8912", Product: "CDE", Amount: "5,500", Status: "0" },
		{ InvoiceId: "5432", Product: "FGH", Amount: "27,000", Status: "1" },
		{ InvoiceId: "7654", Product: "LMNO", Amount: "50,000", Status: "1" },
		{ InvoiceId: "4567", Product: "XYZ", Amount: "11,500", Status: "1" },
		{ InvoiceId: "8912", Product: "CDE", Amount: "5,500", Status: "0" },
		{ InvoiceId: "5432", Product: "FGH", Amount: "27,000", Status: "1" },
		{ InvoiceId: "7654", Product: "LMNO", Amount: "50,000", Status: "1" },
		{ InvoiceId: "4567", Product: "XYZ", Amount: "11,500", Status: "1" },
		{ InvoiceId: "8912", Product: "CDE", Amount: "5,500", Status: "0" },
		{ InvoiceId: "5432", Product: "FGH", Amount: "27,000", Status: "1" },
		{ InvoiceId: "7654", Product: "LMNO", Amount: "50,000", Status: "1" },
		{ InvoiceId: "4567", Product: "XYZ", Amount: "11,500", Status: "1" },
		{ InvoiceId: "8912", Product: "CDE", Amount: "5,500", Status: "0" },
		{ InvoiceId: "5432", Product: "FGH", Amount: "27,000", Status: "1" },
		{ InvoiceId: "7654", Product: "LMNO", Amount: "50,000", Status: "1" },
		{ InvoiceId: "4567", Product: "XYZ", Amount: "11,500", Status: "1" },
		{ InvoiceId: "8912", Product: "CDE", Amount: "5,500", Status: "0" },
		{ InvoiceId: "5432", Product: "FGH", Amount: "27,000", Status: "1" },
		{ InvoiceId: "7654", Product: "LMNO", Amount: "50,000", Status: "1" }
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

	var grid = Ext.create("Ext.grid.Panel", {
		title: "Invoice table",
		extend: Ext.ux.LiveSearchGridPanel,
		store: gridStore,
		pageSize: 10,
		selModel: Ext.create("Ext.selection.CheckboxModel"),

		width: "100%",

		border: true,

		tools: [
			{
				xtype: "button",
				iconCls: "fa fa-plus-circle",
				tooltip: "Add New Record",
				handler: function() {
					let grid = this.up("grid"),
						store = grid.getStore();

					store.insert(0, {
						InvoiceId: "",
						Product: "",
						Amount: ""
					});

					grid.findPlugin("rowediting").startEdit(store.getAt(0));
				}
			}
		],
		columns: [
			{
				text: "InvoiceId",
				dataIndex: "InvoiceId",
				flex: 1,
				editor: {
					xtype: "textfield"
				}
			},
			{
				header: "Product",
				dataIndex: "Product",
				editor: {
					xtype: "textfield"
				},
				flex: 1
			},
			{
				header: "Amount",
				dataIndex: "Amount",
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
		dockedItems: [
			{
				xtype: "pagingtoolbar",
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

							store.insert(0, {
								InvoiceId: "",
								Product: "",
								Amount: ""
							});

							grid.findPlugin("rowediting").startEdit(store.getAt(0));
						}
					},
					{
						text: "Delete",
						iconCls: "fa fa-minus-circle",
						handler: function() {
							var grid = this.up("grid");
							store = grid.getStore();
							var selection = grid
								.getView()
								.getSelectionModel()
								.getSelection()[0];
							if (selection) {
								store.remove(selection);
								Ext.toast("Row/s Deleted");
							}
						}
					},
					{
						text: "Edit",
						iconCls: "fa fa-pencil-square-o",
						handler: function() {
							var grid = this.up("grid");
							store = grid.getStore();
							var selection = grid
								.getView()
								.getSelectionModel()
								.getSelection()[0];
							grid.findPlugin("rowediting").startEdit(selection);
						}
					},
					{
						xtype: "textfield",
						name: "searchField",
						id: "txtfield",
						fieldLabel: "Search:",
						labelAlign: "right",
						emptyText: "search...",
						// clearIcon : true,
						triggers: {
							clear: {
								cls: "x-form-clear-trigger",
								handler: function(field) {
									Ext.toast("Data Filter Cleared!!");
									field.reset();
								}
							}
						},
						width: 300,
						listeners: {
							change: function(cmp) {
								console.log("HERE");
								(searchValue = cmp.getValue()),
									(store = Ext.ComponentQuery.query("grid")[0].getStore());

								if (!Ext.isEmpty(store)) {
									store.clearFilter();

									if (!Ext.isEmpty(searchValue)) {
										var regEx = new RegExp(searchValue, "i"),
											fields = ["InvoiceId", "Product", "Amount", "Status"],
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
					}
				],
				displayMsg: "Displaying {0} to {1} of {2} &nbsp;records ",
				emptyMsg: "No records to display&nbsp;"
			}
		]
	});

	Ext.create("Ext.tab.Panel", {
		renderTo: Ext.getBody(),
		style: { borderStyle: "solid", borderWidth: "2px", borderRadius: "7px" },

		width: "100%",

		items: [
			grid,
			panel1,
			{
				// xtype for all Component configurations in a Container
				title: "Analytics",
				html: "The second tab",

				listeners: {
					render: function() {
						Ext.MessageBox.alert("Tab two", "Tab Two was clicked.");
					}
				}
			}
		]
	});
});