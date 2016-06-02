
var firebase = require('firebase');
var app = firebase.initializeApp({
  serviceAccount: {
    "type": "service_account",
    "project_id": "project-3785172245270804581",
    "private_key_id": "6aee53c378fb86abccfc6fa36d2ac11e6203e01f",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCbNoCUreE1g04q\n+c4lAzMdaqxM3KWbX/6Wll1jyq+iD264Qi9LyVDpIf5yrXFbREucddxYwjS7+fUp\nLlcK8yA2HmEXTmy5FMFTG7Z5KCsTdHg+kRVneXP2+dyxw13WBho3MktQv0WC19it\norM5UC+nfJLNnGtuogH4d+i/m3jCoSXstQ9EDP18tGQjmH6WcWgc5PT4109G9Egs\nPius+dhupup554zsTZ8nU0nce3x50/PRcO88eWQcqsZIlBTergII7i4gTA5cG2Da\nG4YBO9A4ztzUFjeh2IpRYUZ+s9ovBHitBGeDzXWnfcf/1O9yfVwbj1jaWmgouWtn\n5BmeiWxVAgMBAAECggEAW/sim/mnewUDb+h2R+zrf8VVsn8YDUoIH8mgMqFNECdB\nICTozmrRbjddCSzL/qAsht455MfCZJuus+boYm7OagP62cr6F3y7TLshmg8559+f\n2sQ0AQwysuxD43y5wToAkzFU/Nc9JFsx50SCHbbtZr4maX8HE5siu9Kjtdk26W+O\n0oJlQdDaM8RbRIJZgbbsS4j+jwQkDD0d7w0yAxLAmIahfaOb+nim46jZ4BeIDGNG\nnMVuEUUWeab60WYV1Qfr0KUy3d0MA5rfWIJJf8ijy5Oreml2twV9xGT2b7cDhX1Y\nPoy0C6BjbHOEIsdonVGvygyE+YJj4XbW9COx23nCwQKBgQD/7u/sj5Y1IConwaUI\n9VVsmaceHCh1K+9yebjolmqPI9fxv00eT/9heQKm3O1l2TM2jz+baK7Ls7HeZclz\nhRQIN16nytPEpC1cxocaQbjbkme7Fdfr7ZAEMJD26vyyCMP94apteW7YivimMYf8\nWtifLzK+zGDF8o6fk5qPX4nI+QKBgQCbQNmi+Uqh/raQOHd8napsofZp018JCM43\ncqsC1SQLiOfExegwDo7oWHS/d52/sxNHjCzaV3fp2XqzwgoBf8tNCfbAJbjEQ1Vx\ndanX2RKIu5rGlRfVZaiiv8hDhfggpR54KI/dYOmzRDUvyoHDuJ5jwWV6+A5ZHO4j\nfVCh6jwRPQKBgQCbVQmJKhygYcU0G/NuXHhcUWV8gNqNQv0xHW98us4x0i9eKh1E\nKIl3P1q8q5nqFslec9LHH+H3ADkUIfMCieJ+mhx4+kFNN9fQVy3oYbswiMssYTWL\nm8Osx000j6qO44MQs8Yca3c7Nh1zwNwn7XtMIflKlACoI28sqwlDu1iFAQKBgGw/\nsD+Y7/e5gJNYO7+wswZhe01YKphDAn3YvvIPqL0+LNOfZgAz9mJ8YpKplVz3QEcP\nrqpieGKd15cEgTOAZkEF5H0fEBAQHsAoWU79tJWPsSArDl4lLoqji7/A5jvkxTTk\nm0Kw8uGiei8jVI0h6ZYGX3p5AJATwtsN4i2zA0TFAoGBAN0wXAUq64/j7q7ZM7b0\nQLXFHuUjbmU4MxCto9Ep+QItHow51kRRM4+WMJ+komkgiLdpYu3936imD2SKbyTj\njwkdI9oHVhLdf/QNPqydN3PsUNXUA3eSct+W5tlZvFfNhuR2EkQg2+MshssFd1Wf\nFFZgRnhmIlkv6AtbEcFZaLeH\n-----END PRIVATE KEY-----\n",
    "client_email": "tessel@project-3785172245270804581.iam.gserviceaccount.com",
    "client_id": "111998169007049284049",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/tessel%40project-3785172245270804581.iam.gserviceaccount.com"
  },
  databaseURL: "https://thermometer.firebaseio.com",
});

var ref = app.database().ref('sauna');
ref.push({
  temp: 95.5,
  date: (new Date()).toString()
});
