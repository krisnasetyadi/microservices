the main goal of this service is to less hit the multiple times to api

problem
when we render list of id's data it will hitting api multiple times
it depents how many id's would be called in a ui render

query service just for making a query and storing some data and serving that data up very
quickly to users

if this service down the data will store in event bus and if this service running again, it will got data from the event bus
