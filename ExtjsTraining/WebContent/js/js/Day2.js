

/* Day 2*/

Ext.onReady(function() {
	function progressBar(v) {
		return function() {
			if (v == 10) {
				Ext.MessageBox.hide();
				result();
			} else {
				var i = v / 9;
				Ext.MessageBox.updateProgress(i, Math.round(100 * i) + "% completed");
			}
		};
	}
	function showProgressBar() {
		for (var i = 1; i < 11; i++) {
			setTimeout(progressBar(i), i * 500);
		}
	}
	function result() {
		Ext.Msg.alert("status", "Your leave request has been sent to your manager");
	}
	var val = "c";
	var btn = Ext.create("Ext.Button", {
		margin: "10 10 10 10",
		text: "Raise Request",
		listeners: {
			click: function() {
				Ext.MessageBox.confirm("Confirm", "Confirm Leave Request?", callbackFunction);
				function callbackFunction(btn) {
					if (btn == "yes") {
						Ext.MessageBox.show({
							title: "Please wait",
							msg: "Your request is being processed",
							progressText: "Initializing...",
							width: 300,
							progress: true,
							closable: false
						});
						showProgressBar();
					} else {
						Ext.Msg.alert("Cancelled", "You cancelled the request");
					}
				}
			}
		}
	});
	var frmAccount = Ext.create("Ext.form.Panel", {
		bodyPadding: 5,
		frame: true,
		renderTo: Ext.getBody(),
		items: [
			{
				xtype: "textfield",
				fieldLabel: "Employee Name",
				name: "accountNum"
			},
			{
				xtype: "textfield",
				fieldLabel: "Employee Id",
				name: "empid"
			},

			{
				xtype: "combobox",
				fieldLabel: "Leave Type",
				store: Ext.create("Ext.data.Store", {
					fields: ["abbr", "name"],
					data: [
						{
							abbr: "Sick Leave",
							name: "Sick Leave"
						},
						{
							abbr: "Out of Station",
							name: "Out of Station"
						},
						{
							abbr: "Maternity/Paternity Leave",
							name: "Maternity/Paternity Leave"
						}
					]
				}),
				valueField: "abbr",
				displayField: "name"
			},
			{
				xtype: "datefield",
				fieldLabel: "Start date"
			},
			{
				xtype: "datefield",
				fieldLabel: "End date"
			},
			btn,
			{
				xtype: "button",
				text: "Cancel",
				margin: "10 10 10 10",
				handler: function() {
					winAddAccount.hide();
				}
			}
		]
	});

	// store for drop down values

	Ext.create("Ext.panel.Panel", {
		renderTo: Ext.getBody(),
		id: "Leave",
		margin: "60 60 60 450",
		title: "Leave Request",
		width: 400,
		height: 400,
		modal: true,
		closeAction: "hide",
		items: frmAccount,
		layout: "fit",
		bodyPadding: 5
	});
});