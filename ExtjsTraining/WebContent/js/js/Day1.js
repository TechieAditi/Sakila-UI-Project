/* Day 1 */
Ext.onReady(function() {
	var filterPanel = Ext.create("Ext.panel.Panel", {
		bodyPadding: 5, // Don't want content to crunch against the borders
		width: 300,
		title: "Filters",
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
	Ext.create("Ext.panel.Panel", {
		renderTo: Ext.getBody(),
		height: 300,
		width: 600,
		layout: "column",

		defaults: {
			collapsible: true,
			split: true,
			bodyStyle: "padding:15px"
		},
		items: [
			{
				title: "Panel1",
				region: "west",
				html: "This is Panel 1",
				columnWidth: 0.1
			},
			{
				title: "Panel2",
				region: "center",
				html: "This is Panel 2",
				columnWidth: 0.1
			},
			{
				title: "Panel3",
				region: "south",
				html: "This is Panel 3",
				columnWidth: 0.1
			},
			{
				title: "Panel4",
				region: "east",
				html: "This is Panel 4",
				columnWidth: 0.1
			},
			{
				title: "Panel5",
				region: "north",
				html: "This is Panel 5"
			},
			filterPanel
		]
	});
	Ext.create("Ext.container.Container", {
		renderTo: Ext.getBody(),
		layout: "auto",
		width: 600,

		items: [
			{
				title: "First Component",
				html: "This is First Component"
			},
			{
				title: "Second Component",
				html: "This is Second Component"
			},
			{
				title: "Third Component",
				html: "This is Third Component"
			},
			{
				title: "Fourth Component",
				html: "This is Fourth Component"
			}
		]
	});
	Ext.create("Ext.tab.Panel", {
		renderTo: Ext.getBody(),
		requires: ["Ext.layout.container.Card"],
		xtype: "layout-cardtabs",
		width: 600,
		height: 200,
		items: [
			{
				title: "Tab 1",
				html: "This is first tab."
			},
			{
				title: "Tab 2",
				html: "This is second tab."
			},
			{
				title: "Tab 3",
				html: "This is third tab."
			}
		]
	});
	Ext.create("Ext.panel.Panel", {
		renderTo: Ext.getBody(),
		requires: ["Ext.layout.container.Card"],
		layout: "card",
		width: 600,
		height: 200,
		bodyPadding: 15,

		defaults: {
			border: false
		},
		defaultListenerScope: true,

		bbar: [
			"->",
			{
				itemId: "card-prev",
				text: "« Previous",
				handler: "showPrevious",
				disabled: true
			},
			{
				itemId: "card-next",
				text: "Next »",
				handler: "showNext"
			}
		],

		items: [
			{
				id: "card0",
				html:
					'<h2> This is card wizard layout </h2> <p> This is first card </p> <p> Please click the "Next" button to continue... </p>'
			},
			{
				id: "card1",
				html:
					'<p> This is second card </p> <p> Please click the "Next" button for next card and "Previous" button for previous card... </p>'
			},
			{
				id: "card2",
				html:
					'<p> This is final card </p> <p> Please click the "Previous" button for previous card... </p>'
			}
		],

		showNext: function() {
			this.cardPanelNavigation(1);
		},

		showPrevious: function(btn) {
			this.cardPanelNavigation(-1);
		},

		cardPanelNavigation: function(incr) {
			var me = this;
			var l = me.getLayout();
			var i = l.activeItem.id.split("card")[1];
			var next = parseInt(i, 10) + incr;
			l.setActiveItem(next);
			me.down("#card-prev").setDisabled(next === 0);
			me.down("#card-next").setDisabled(next === 2);
		}
	});
	Ext.create("Ext.panel.Panel", {
		renderTo: Ext.getBody(),
		layout: "column",
		xtype: "layout-column",
		requires: ["Ext.layout.container.Column"],
		width: 600,

		items: [
			{
				title: "First Component width 30%",
				html: "This is First Component",
				columnWidth: 0.3
			},
			{
				title: "Second Component width 40%",
				html: "<p> This is Second Component </p> <p> Next line for second component </p>",
				columnWidth: 0.4
			},
			filterPanel
		]
	});
	Ext.create("Ext.container.Container", {
		renderTo: Ext.getBody(),
		layout: {
			type: "fit"
		},
		width: 600,
		defaults: {
			bodyPadding: 15
		},
		items: [
			{
				title: "Panel1",
				html: "This is panel 1"
			},
			{
				title: "Panel2",
				html: "This is panel 2"
			},
			{
				title: "Panel3",
				html: "This is panel 3"
			},
			{
				title: "Panel4",
				html: "This is panel 4"
			}
		]
	});
	Ext.create("Ext.container.Container", {
		renderTo: Ext.getBody(),
		layout: {
			type: "table",
			columns: 3,
			tableAttrs: {
				style: {
					width: "100%"
				}
			}
		},
		width: 600,
		height: 200,

		items: [
			{
				title: "Panel1",
				html: "This panel has colspan = 2",
				colspan: 2
			},
			{
				title: "Panel2",
				html: "This panel has rowspan = 2",
				rowspan: 2
			},
			{
				title: "Panel3",
				html: "This  s panel 3"
			},
			{
				title: "Panel4",
				html: "This is panel 4"
			},
			{
				title: "Panel5",
				html: "This is panel 5"
			}
		]
	});
	Ext.create("Ext.panel.Panel", {
		renderTo: Ext.getBody(),
		layout: {
			type: "vbox",
			align: "stretch"
		},
		requires: ["Ext.layout.container.VBox"],
		xtype: "layout-vertical-box",
		width: 600,
		height: 400,
		frame: true,
		items: [
			{
				title: "Panel 1",
				html: "Panel with flex 1",
				margin: "0 0 10 0",
				flex: 1
			},
			{
				title: "Panel 2",
				html: "Panel with flex 2",
				margin: "0 0 10 0",
				flex: 2
			},
			{
				title: "Panel 3",
				flex: 2,
				margin: "0 0 10 0",
				html: "Panel with flex 2"
			},
			{
				title: "Panel 4",
				html: "Panel with flex 1",
				margin: "0 0 10 0",
				flex: 1
			}
		]
	});
	Ext.create("Ext.panel.Panel", {
		renderTo: Ext.getBody(),
		layout: {
			type: "hbox"
		},
		requires: ["Ext.layout.container.HBox"],
		xtype: "layout-horizontal-box",
		width: 600,
		frame: true,
		items: [
			{
				title: "Panel 1",
				html: "Panel with flex 1",
				flex: 1
			},
			{
				title: "Panel 2",
				html: "Panel with flex 2",
				flex: 2
			},
			{
				title: "Panel 3",
				width: 150,
				html: "Panel with width 150"
			},
			{
				title: "Panel 4",
				html: "Panel with flex 1",
				flex: 1
			}
		]
	});
});