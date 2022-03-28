# SLIDE 2

SELECT DISTINCT public_name, ST_AsGeoJSON(ST_Transform(geometry,4326))
FROM ppr_properties
WHERE ppr_district = '7'

SELECT DISTINCT public_name, property_classification, program_sites, ST_AsGeoJSON(ST_Transform(geometry,4326)) as boundaries, ST_AsGeoJSON(ST_Centroid(ST_Transform(geometry,4326))) AS points
FROM ppr_properties
WHERE ppr_district = '7'

SELECT row_to_json(fc)
 FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
 FROM (SELECT 'Feature' As type
    , ST_AsGeoJSON(ST_Transform(geometry,4326))::json As geometry
    , row_to_json((SELECT l FROM (SELECT public_name, property_classification, program_sites, ppr_district) As l
      )) As properties
   FROM ppr_properties As lg   ) As f )  As fc;
