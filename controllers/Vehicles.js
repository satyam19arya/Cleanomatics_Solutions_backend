const vehicles = [
    { name: 'Maruti Suzuki Alto', topSpeed: 140, fuelEfficiency: 22.05, fuelCapacity: 35, maxRange: 771.75 },
    { name: 'Hyundai i20', topSpeed: 180, fuelEfficiency: 20.35, fuelCapacity: 37, maxRange: 753.05 },
    { name: 'Tata Nexon', topSpeed: 180, fuelEfficiency: 17.57, fuelCapacity: 44, maxRange: 772.68 },
    { name: 'Honda City', topSpeed: 180, fuelEfficiency: 17.8, fuelCapacity: 40, maxRange: 712.00 },
    { name: 'Mahindra Thar', topSpeed: 155, fuelEfficiency: 15.2, fuelCapacity: 57, maxRange: 866.40 },
    { name: 'Toyota Innova Crysta', topSpeed: 179, fuelEfficiency: 11.25, fuelCapacity: 55, maxRange: 618.75 },
    { name: 'Kia Seltos', topSpeed: 170, fuelEfficiency: 16.8, fuelCapacity: 50, maxRange: 840.00 },
    { name: 'Renault Kwid', topSpeed: 150, fuelEfficiency: 22.3, fuelCapacity: 28, maxRange: 624.40 },
    { name: 'Ford EcoSport', topSpeed: 182, fuelEfficiency: 15.9, fuelCapacity: 52, maxRange: 826.80 },
    { name: 'Tata Tiago', topSpeed: 150, fuelEfficiency: 23.84, fuelCapacity: 35, maxRange: 834.40 }
];

const getVehicles = (req, res) => {
    try{
        res.status(200).json(vehicles);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

const getTimeData = (req, res) => {
    try{
        const { vehicleName, distance } = req.body;

        if(!vehicleName || !distance){
            return res.status(400).json({message: 'Please select a vehicle and enter distance'});
        }

        const vehicle = vehicles.find(vehicle => vehicle.name === vehicleName);

        if(!vehicle){
            return res.status(404).json({message: 'Vehicle not found'});
        }

        const results = vehicles.map(vehicle => {
            const time = distance / vehicle.topSpeed;
            const fuelNeeded = distance / vehicle.fuelEfficiency;
            const isOutOfRange = distance > vehicle.maxRange;

            return {
                vehicleName: vehicle.name,
                time: time.toFixed(2),
                fuelNeeded: fuelNeeded.toFixed(2),
                isOutOfRange
            };
        });

        const selectedVehicleResult = results.find(result => result.vehicleName === vehicleName);

        res.json({
            selectedVehicleResult,
            comparisonResults: results
        });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    getVehicles,
    getTimeData
}