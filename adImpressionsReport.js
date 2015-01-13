$data.Class.define("dfp.adImpression", $data.Entity, null, {
    Id: { type: "id", key: true, computed: true, nullable: false },
    Template: { type: String },
    Site: { type: String },
    Size: { type: String },
    Date: { type: "Edm.DateTimeOffset" },
    DateStr: { type: String },
    //TemplateID: { type: String },
    TemplateID: { type: "int" },
    //AdUnitID: { type: String },
    AdUnitID: { type: "int" },
    Impressions: { type: "int" },
    PageViews: { type: "int" }
}, null);

$data.Class.defineEx("dfp.adImpressionContext", [$data.EntityContext,$data.ServiceBase], null, {
    adImpressions: { type: $data.EntitySet, elementType: dfp.adImpression }
});

exports = dfp.adImpressionContext;

