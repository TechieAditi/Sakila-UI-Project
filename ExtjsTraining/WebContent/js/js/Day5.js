// Day 5
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
		bodyPadding: 5, // Don't want content to crunch against the borders
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
		{ InvoiceId: "7654", Product: "LMNO", Amount: "50,000", Status: "1" }
	];

	// Creation of first grid store
	var gridStore = Ext.create("Ext.data.Store", {
		model: "StudentDataModel",
		pageSize: 5,
		proxy: {
			type: "memory",
			enablePaging: true
		},
		data: myData
	});

	// Creation of first grid

	Ext.create("Ext.grid.Panel", {
		title: "Invoice table",

		store: gridStore,
		pageSize: 2,
		selModel: Ext.create("Ext.selection.CheckboxModel"),
		height: 400,
		width: 660,
		margin: "30 1000 10 300",

		border: true,

		renderTo: Ext.getBody(),

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

		bbar: [
			"->",
			{
				text: "Submit Changes",
				handler: function() {
					this.up("grid")
						.getStore()
						.sync();
				}
			},
			{
				xtype: "pagingtoolbar",
				pageSize: 5,
				store: gridStore,
				displayInfo: true
			}
		],
		items: [
			{
				xtype: "searchtrigger",
				autoSearch: true
			}
		],
		viewConfig: {
			listeners: {
				cellclick: function(view, cell, cellIndex, record, row, rowIndex, e) {
					var clickedDataIndex = view.panel.headerCt.getHeaderAtIndex(cellIndex)
						.dataIndex;
					var clickedColumnName = view.panel.headerCt.getHeaderAtIndex(cellIndex).text;
					var clickedCellValue = record.get(clickedDataIndex);
					console.log("value", clickedCellValue);
				}
			}
		}
	});
});
