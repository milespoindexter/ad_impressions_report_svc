Ad Impressions Report Service  
2014-11-28  
selfpropelledcity@gmail.com  
  
This report combines ad impression data and page view data from various vendors like DFP and Omniture.  
  
URL:  
http://localhost:3024/ad_impressions  
  
Filter to see only Self ad impressions:  
http://localhost:3024/ad_impressions?format=json&Site=Self  
  
Filter to see only Self ad impressions for a specific day:  
http://localhost:3024/ad_impressions?format=json&Site=Self&Date=2014-12-04  
  
Filter on Site, Date and Template:  
http://localhost:3024/ad_impressions?format=json&Site=bonapp.dart&Date=2014-11-30&Template=Article  
  
Date Range:  
http://localhost:3024/ad_impressions?format=json&Start=2014-11-10&End=2014-11-30  
  
http://localhost:3024/ad_impressions?format=json&Start=2014-11-20  
  
http://localhost:3024/ad_impressions?format=json&Start=2014-11-09&End=2014-11-20  
http://localhost:3024/ad_impressions?format=json&Start=2014-11-20  
  
SAMPLE DATA:  
{  
	"_id" : ObjectId("546e4582aa241e634addaae6"),  
	"Template" : "Slideshow",  
	"Site" : "Wiredcom",  
	"Size" : "300 x 1050",  
	"Date" : "2014-11-19",  
	"TemplateID" : "104085049735",  
	"AdUnitID" : "14224015",  
	"Impressions" : "3226",  
	"PageViews" : "833094",  
	"Page" : "Slideshow - Inline initial"  
}  
  
TEST:  
http://localhost:3024/ad_impressions?format=json&Site=Self  
  
http://localhost:3024/ad_impressions?format=json&Site=Self&Date=2014-11-19  
  
Search params:  
Site  
Date  
Page  
Size  
Template  
  
Paging params:  
limit  
skip  
  
create the date object from string field:  
  
first copy date string to DateStr field:  
db.adImpressions.find().forEach(function(doc) {   
    doc.DateStr=doc.Date;  
    db.adImpressions.save(doc);   
    })  
  
convert Date field value to a Date object,  
and add 5 hours for the TimeZone offset:  
db.adImpressions.find().forEach(function(doc) {   
    var nd = new Date(doc.DateStr);  
    nd.setHours(nd.getHours()+5);  
    doc.Date=nd;  
    db.adImpressions.save(doc);   
    })  
  
  
ODATA ______________________________________________________________________  
URL:  
http://localhost:3022/ad_impressions/odata/$metadata  
http://localhost:3022/ad_impressions/odata/$metadata  
  
TEST:  
just see 3 results:  
http://localhost:3022/ad_impressions/odata/adImpressions?$format=json&$top=3  
  
Filter to see only Self ad impressions:  
http://localhost:3022/ad_impressions/odata/adImpressions?$format=json&$filter=Site eq 'Self'  
  
Filter to see only Self ad impressions for a specific day:  
http://localhost:3022/ad_impressions/odata/adImpressions?$format=json&$filter=Site eq 'Self' and Date eq '2014-11-19'  
  
Date Range:  
http://localhost:3022/ad_impressions/odata/adImpressions?$format=json&$filter=Date gt '2014-11-09' and Date lt '2014-11-20'  
  
import csv file  
mongoimport -d dfp -c adImpressions --type csv --file dfp_omni_report.csv --headerline -v  
  
mongoimport -host localhost -d dfp -c adImpressions --type csv --file dfp_omni_report.csv --headerline -v  
  
  
Add headers to csv file:  
Template,Site,Size,Date,TemplateID,AdUnitID,Impressions,PageViews  
  
  
db.adImpressions.findOne({PageVisits: {$exists:true}})  
{  
    "_id" : ObjectId("5457fbc57862ff03c2ac6f12"),  
    "Template" : "cttp=Slideshow",  
    "Site" : "Self",  
    "Size" : "300 x 250",  
    "Date" : "2014-10-15",  
    "TemplateID" : NumberLong("104085049735"),  
    "AdUnitID" : NumberLong(14225095),  
    "Impressions" : 103976,  
    "PageViews" : 1745200  
}  
  
  
sample $metadata:  
<edmx:Edmx xmlns:edmx="http://schemas.microsoft.com/ado/2007/06/edmx" Version="1.0">  
<edmx:DataServices xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" m:DataServiceVersion="1.0" m:MaxDataServiceVersion="2.0">  
<Schema xmlns="http://schemas.microsoft.com/ado/2008/09/edm" Namespace="dfp">  
<EntityType Name="adImpression">  
<Key>  
<PropertyRef Name="Id" />  
</Key>  
<Property xmlns:p6="http://schemas.microsoft.com/ado/2009/02/edm/annotation" Name="Id" Nullable="false" p6:StoreGeneratedPattern="Identity" Type="Edm.String" />  
<Property Name="Template" Type="Edm.String" />  
<Property Name="Site" Type="Edm.String" />  
<Property Name="Size" Type="Edm.String" />  
<Property Name="Date" Type="Edm.String" />  
<Property Name="TemplateID" Type="Edm.Int64" />  
<Property Name="AdUnitID" Type="Edm.Int64" />  
<Property Name="Impressions" Type="Edm.Int32" />  
<Property Name="PageViews" Type="Edm.Int32" />  
</EntityType>  
<EntityContainer m:IsDefaultEntityContainer="true" Name="adImpressionContext">  
<EntitySet EntityType="dfp.adImpression" Name="adImpressions" />  
</EntityContainer>  
</Schema>  
</edmx:DataServices>  
</edmx:Edmx>  
  
  
