#API section : 
    link : https://catalogue.streamsystem.com

    # add information :
        link : http://catalogue.streamsystem.com/api/addinformation
        method : POST 
        data: {
            "nom": "xxx",
            "prenom": "xxx",
            "phone": "xxx",
            "wilaya": "xxx",
            "adr": "xxx",
            "gender": "xxx",
            "age": xxx,
            "status": "pending"
        }
        Result : 
            if missing parameters :
                status: 400
                data: {
                    "message": "missing parameters"
                }
            
            if user exists :
                status: 400
                data: {
                    "message": "user exists"
                }
            
            if Internal Server Error
                status: 500
                    data: {
                        "message": "Internal Server Error"
                    }
            
            if information added
                status: 201
                data: {
                    "message": "Information added"
                }
    