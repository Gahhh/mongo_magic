# Rationale and approach of the calculation model

## Overall Weights   
Generally, sustainability has three main components:
social, environmental and economic. As per the requirements, this model covers all three components in terms of questions. The weights of each question set are as follows:   
 -  Location (10%)
 -  Public Transport (20%)
 -  Energy (40%)
 -  Green Star Rating/NABERS (30%)
 -  Other measures (25%) (if rating is not available)   

From the weights schedule, the user will be in disadvantage if their office/data centre has not been rated by the NABERS or Green Building Council. For the final result, we will provide the user with a relative score. The score will be based on the current data and ranking in the database. The highest score will be 99, which means the user's result is in the top 1%.  

Reference:   
Wagner, B. and Svensson, G. (2014), "A framework to navigate sustainability in business networks: The transformative business sustainability (TBS) model", European Business Review, Vol. 26 No. 4, pp. 340-367. https://doi.org/10.1108/EBR-12-2013-0146   

Muhammad Asif, Cory Searcy, Rickard Garvare & Niaz Ahmad (2011) Including sustainability in business excellence models, Total Quality Management & Business Excellence, 22:7, 773-786, DOI: 10.1080/14783363.2011.585784

## Question - Postcode:   
Based on the postcode, we can determine the location of the office/data centre.
We used the energy mix data from the federal government to determine the renewable energy mix in the user's area.
The baseline we set is the national average of the percentage of gas + renawerable energy mix.
Based on the calculation, the score of each state is calculated and listed below:
National average: 5, NSW+ACT: 3, VIC: 5, QLD: 5, SA: 6, WA: 6, NT: 7, TAS: 9 which higher is better.   
Reference:   
https://www.energy.gov.au/data/states-and-territories

## Question - Public Transport:
We will give 1 point for each public transport option in the user's area. Based on the article below(Kennedy et al., 2002), the CO2 emission of an private car (7L/100km) is between 47g/person-km. But for metro train, the emission is between 7.5-11g/person-km. Based on this, with no public transport option, the user will get a score of 0, and with public transport option, the user will get a maximum score of 20. 

Reference:    
Miller, P., de Barros, A.G., Kattan, L. et al. Public transportation and sustainability: A review. KSCE J Civ Eng 20, 1076–1083 (2016). https://doi.org/10.1007/s12205-016-0705-0   

Kennedy, C.A. A comparison of the sustainability of public and private transportation systems: Study of the Greater Toronto Area. Transportation 29, 459–493 (2002). https://doi.org/10.1023/A:1016302913909   

## Question - Green star rating:   
Today, 44 per cent of Australia’s CBD office space and 40 per cent of retail space is Green Star certified. [source: Green Star 2019/20](https://gbca-web.s3.amazonaws.com/media/documents/green-star-in-focus-2020-final-spreads-sml.pdf).    
Therefore, we will heavily reward the user if the user's office building is Green Star certified.   
As there are only 12 buildings in Australia received 6 stars, we will give 5 bonus points for the user if the user's office building is 6 stars on top of the full marks. For these haven't got certified, we will ask two questions about their HVAC system, for each question we will give 1 point, if the answer is true. 

## Question - Electricity Usage:
We will collect the electricity consumption data with the floor area and number of employees in a office. Also, two questions will be asked about the lighting system. Users will be given extra points if they have a sustainable lighting system.

## Question - Data Centre:
We also collect the information about the data centre. 
The questions will base on the electricity consumption and any sustainability measures. Also, we will ask if the data centre has a NABERS Rating. NABERS is a performance-based national rating system that measures the environmental performance of existing buildings, tenancies and homes. We encourage the user to get a NABERS rating for their data centre, therefore, we will give more weightage on the NABERS rating.
If the user doesn't have a NABERS rating, our evluation will be based on the electricity consumption and the sustainability measures. 



