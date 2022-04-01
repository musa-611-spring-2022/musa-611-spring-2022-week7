## getting libs and green data

library(dplyr)
library(sf)
library(mapview)
library(ggplot2)
layers <- st_layers("C:\\Users\\brine\\Downloads\\Greenspace.gdb(1)\\Greenspace.gdb") 

lib <- st_read("C:\\Users\\brine\\Downloads\\Greenspace.gdb(1)\\Greenspace.gdb", layer = "libraries") 

green <- st_read("C:\\Users\\brine\\Downloads\\Greenspace.gdb(1)\\Greenspace.gdb", layer = "Greenspace") 

g4326<-green%>%st_transform(4326)
mapview(lib)


ggplot()+
  geom_sf(data=lib)


st_write(lib, "lib.geojson")
parks%>%st_crs()


for i in pois_glm_tuned[2]