exports.company = (req, res, next) => {
    res.status(200).json({
        data: [{
            id : 1,
            name: "Rakuten Group, Inc.",
            address : {
                province:"Tokyo",
                postcode:"158-0094"
            }
        },{
            id : 2,
            name: "Twitter, Inc.",
            address : {
                province:"San Francisco",
                postcode:94103
            }
        },{
            id : 3,
            name: "Accenture Solution Inc.",
            address : {
                province:"Bangkok",
                postcode:10110
            }
        }
     ]
    })
}