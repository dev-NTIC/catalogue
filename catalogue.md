#API section : 
    link : https://catalogue.streamsystem.com

    #_Product Categories :
        link : https://catalogue.streamsystem.com/api/categories
        method : Get 
        Result : 
        [
            {
                "id":1,
                "category":"LED",
                "categoryimg":"https://catalogue.streamsystem.com/uploads/1669281224366--IMG (300X300).png"
            },
            {
                "id":2,
                "category":"SMART",
                "categoryimg":"https://catalogue.streamsystem.com/uploads/1669281224366--IMG (300X300).png"
            },
            {
                "id":3,
                "category":"SMART HD",
                "categoryimg":"https://catalogue.streamsystem.com/uploads/1669281224366--IMG (300X300).png"
            }
        ]

    #_Products List : 
        link : https://catalogue.streamsystem.com/api/produits
        method : Get 
        Result : 
        [
            {
                "id":1,
                "model":"BM32C1",
                "category":"SMART HD",
                "size":32,
                "os":"WebOS",
                "price":36000,
                "points":14,
                "is_new":"false",
                "is_available":"true",
                "is_bestselling":"true",
                "ram":4,
                "rom":8,
                "weight":3.200000047683716,
                "hdmi":3,
                "usb":4,
                "vga":1,
                "dimensions":"230x430x450",
                "wifi":"true",
                "bluetooth":"false",
                "earphone":"true",
                "ethernet":"true",
                "description":"Lorem ipsum, dolor sit amet consectetur.",
                "oldprice":38500,"rating":4,
                "techsheet":"https://catalogue.streamsystem.com/uploads/1669281230998--fiche_technique.pdf",
                "productimg":"https://catalogue.streamsystem.com/uploads/1669281224366--IMG (300X300).png",
                "banner":"https://catalogue.streamsystem.com/uploads/1669281224366--IMG (300X300).png",
                "category_id":3,
                "options":
                    {
                        "ram":4,
                        "rom":8,
                        "weight":3.200000047683716,
                        "hdmi":3,
                        "usb":4,
                        "vga":1,
                        "dimensions":"230x430x450",
                        "wifi":"true",
                        "bluetooth":"false",
                        "earphone":"true",
                        "ethernet:":"true"
                    }
            }
        ]


    #_SAVs List : 
        link : https://catalogue.streamsystem.com/api/sav
        method : Get 
        Result : 
        [
            {
                "id":1,
                "nom":"KHEMIS MALIANA",
                "adr":"Rue Amari Ahmed, Khemis Miliana, Ain Defla",
                "tel":"0560.96.17.19",
                "lat":"36.259421",
                "lon":"2.213538",
                "type":"sav",
                "id_type":1
            }
        ]
    
    #_get media : 
        link : https://catalogue.streamsystem.com/api/files/:type
        method : POST
        body: //avialable types : video, splach, banner, pub
            {
                "type": "splach"
            } 
        Result : 
            [
                {
                    "id": 3,
                    "link": "https://catalogue.streamsystem.com/data//splash/1.png",
                    "type": 3,
                    "nom": "splach"
                },
                {
                    "id": 3,
                    "link": "https://catalogue.streamsystem.com/data//splash/2.png",
                    "type": 3,
                    "nom": "splach"
                }
            ]

