library(sf)
library(dplyr)
library(tidyverse)

fedex <- st_read('/Users/tushimin/Desktop/MUSA611/midterm/data/FedEx_Facilities.geojson')
ups <- st_read('/Users/tushimin/Desktop/MUSA611/midterm/data/UPS_Facilities.geojson')
dhl <- st_read('/Users/tushimin/Desktop/MUSA611/midterm/data/DHL_Facilities.geojson')

fedex_1 <- fedex %>% 
  filter(STATE == 'PA' & CITY == 'PHILADELPHIA') %>%
  dplyr::select("NAME","TYPE","ADDRESS","ZIP","CENSUS_CODE","LATITUDE","LONGITUDE")
fedex_1['COMPANY'] <- 'FedEx'
fedex_1['PHONE'] <- 'UNKOWN'

ups_1 <- ups %>% 
  filter(STATE == 'PA' & CITY == 'PHILADELPHIA' & NAME != "UPS ALLIANCE LOCATION" & NAME != "UPS CUSTOMER CENTER") %>%
  dplyr::select("BUSINESS_NAME","NAME","ADDRESS","ZIP","CENSUS_CODE","LATITUDE","LONGITUDE","PHONE") %>%
  rename("NAME" = "BUSINESS_NAME",
         "TYPE" = "NAME")
ups_1['COMPANY'] <- 'UPS'

dhl_1 <- dhl %>% 
  filter(STATE == 'PA' & CITY == 'PHILADELPHIA') %>%
  dplyr::select("NAME","LOCATION_TY","ADDRESS","ZIP","CENSUS_CODE","LATITUDE","LONGITUDE") %>%
  rename("TYPE" = "LOCATION_TY")

dhl_1['COMPANY'] <- 'DHL'
dhl_1['PHONE'] <- 'UNKOWN'

PO_DATA <- rbind(fedex_1,ups_1)
PO_DATA <- rbind(PO_DATA,dhl_1)

PO_DATA <- PO_DATA %>% 
  mutate(TYPE = case_when(
  TYPE == "Self-Service"|TYPE == "Drop Box"|TYPE == "UPS DROP BOX" ~ "Drop Box",
  TYPE == "Authorized Ship Center" |TYPE == "AUTHORIZED SHIPPING OUTLET"|TYPE == "DHL Authorized Shipping Center" ~ "Authorized Ship Center",
  TRUE ~ "Staffed Facility"
))

#st_write(PO_DATA,'/Users/tushimin/Desktop/MUSA611/midterm/data/PO_DATA.geojson')

PO_DATA <- st_read('/Users/tushimin/Desktop/MUSA611/midterm/data/PO_DATA.geojson')
Neigh <- st_read('/Users/tushimin/Desktop/MUSA611/midterm/data/Neighborhoods_Philadelphia.geojson')

PO_NEIGH <- PO_DATA %>%
  st_join(Neigh['listname'],join=st_within) %>%
  na.omit()

PO_NEIGH <- st_read('/Users/tushimin/Desktop/MUSA611/midterm/data/PO_NEIGH.json')

zipData <- st_read('/Users/tushimin/Desktop/MUSA611/midterm/data/Zipcodes.geojson')
mostZip <- PO_NEIGH %>%
  st_drop_geometry() %>%
  group_by(ZIP) %>%
  count() %>%
  rename('number' = 'n','CODE' = 'ZIP') 

zipData <- zipData %>%
  left_join(mostZip, by = 'CODE') %>%
  replace(is.na(.), 0) 

st_write(zipData,'/Users/tushimin/Desktop/MUSA611/midterm/data/Zip.geojson')

