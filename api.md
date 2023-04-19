#add informations:

    link: /api/addinformation
    type: POST
    data: {
            "nom": "xxx",
            "prenom": "xxx",
            "phone": "xxx",
            "wilaya": "xxx",
            "adr": "xxx"
        }

    return :
        if missing parameters :
            status: 400
            data: {
                "message": "missing parameters"
            }

        if the server have some internal issues :
            status: 500
            data: {
                "message": "Internal Server Error"
            }

        Information added :
        status: 201
        data: {
            "message": "Information added"
        }

#pub :
link: /api/getPub
type: GET

    return :

        if the server have some internal issues :
            status: 500
            data: {
                "message": "Internal Server Error"
            }

        Information added :
        status: 201
        data: [
            {
                "id": 1,
                "title": "title 1",
                "content": "XXXXXX",
                "img_url": "/uploads/1669281224366--IMG (300X300).png",
                "link": "www.streamsystem.com",
                "isactive": "oui"
            }

        ]
