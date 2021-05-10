

// Day 3
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
		{ InvoiceId: "7654", Product: "LMNO", Amount: "50,000", Status: "1" }
	];

	// Creation of first grid store
	var gridStore = Ext.create("Ext.data.Store", {
		model: "StudentDataModel",
		data: myData
	});

	// Creation of first grid
	var grid = Ext.create("Ext.grid.Panel", {
		id: "gridId",
		store: gridStore,
		stripeRows: true,
		title: "Collections", // Title for the grid
		// Div id where the grid has to be rendered
		width: 600,
		collapsible: true, // property to collapse grid
		enableColumnMove: true, // property which allows column to move to different position by dragging that column.
		enableColumnResize: true, // property which allows to resize column run time.
		listeners: {
			itemclick: function(view, record) {
				var f = Ext.create("Ext.form.Panel", {
					xtype: "formpanel",
					title: "Update Record",
					width: 300,
					height: 250,
					floating: true,
					centered: true,
					modal: true,
					buttons: [
						{
							text: "Update",
							iconCls: "x-fa fa-check",
							handler: function() {
								f.updateRecord(record);
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
							xtype: "displayfield",
							name: "InvoiceId",
							fieldLabel: "InvoiceId"
						},
						{
							xtype: "textfield",
							name: "Status",
							fieldLabel: "Status"
						},
						{
							xtype: "textfield",
							name: "Amount",
							fieldLabel: "Amount"
						}
					]
				});
				f.show();
				f.loadRecord(record);
			}
		},
		columns: [
			{
				header: "InvoiceId",
				dataIndex: "InvoiceId",
				id: "InvoiceId",
				flex: 0.5, // property defines the amount of space this column is going to take in the grid container with respect to all.
				sortable: true, // property to sort grid column data.
				hideable: true // property which allows column to be hidden run time on user request.
			},
			{
				header: "Product",
				dataIndex: "Product",
				flex: 0.5,
				sortable: true,
				hideable: false // this column will not be available to be hidden.
			},
			{
				header: "Amount",
				dataIndex: "Amount",
				flex: 0.5,
				sortable: true,
				hideable: false // this column will not be available to be hidden.
			},
			{
				header: "Status",
				dataIndex: "Status",
				flex: 0.5,
				sortable: true,

				// renderer is used to manipulate data based on some conditions here
				// who ever has marks greater than 75 will be displayed as
				// 'Distinction' else 'Non Distinction'.
				renderer: function(value, metadata, record, rowIndex, colIndex, store) {
					if (value > 0) {
						return "Paid on time";
					} else {
						return "Payment Delayed";
					}
				}
			}
		]
	});
	Ext.create("Ext.tab.Panel", {
		renderTo: Ext.getBody(),
		style: { borderStyle: "solid", borderWidth: "2px", borderRadius: "7px" },
		height: 400,
		width: 600,
		margin: "50 10 10 300",
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