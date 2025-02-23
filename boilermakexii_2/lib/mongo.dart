import 'dart:developer';

import 'package:mongo_dart/mongo_dart.dart';

String MONGODB_URI= "mongodb+srv://hi:hello@boilermakexii.d2rj0.mongodb.net/?retryWrites=true&w=majority&appName=boilermakeXII";
List<String> classification = [];
List<String> segmentation = [];

void mongo_tests() async {
  var db = await Db.create(MONGODB_URI);
  await db.open();
  inspect(db);
  var status = db.serverStatus();
  print(status);
  print('Connected to the database');
  var tests = db.collection('images');
  final images = await tests.find().toList();



  print(images);
  await db.close();
}

Future<void> fetchGroupedImages() async {
  const uri =
      "mongodb+srv://hi:hello@boilermakexii.d2rj0.mongodb.net/tests?retryWrites=true&w=majority&appName=boilermakeXII";

  var db = await Db.create(MONGODB_URI);
  await db.open();
  print('Connected to the database');
  List documents = await db.collection('images').find().toList();
  await db.close();


  for (var doc in documents) {
    if (doc.containsKey('type') && doc.containsKey('driveLink')) {
      final String type = doc['type'].toString().toLowerCase();
      final String driveLink = doc['driveLink'].toString();

      if (type == 'classification') {
        classification.add(driveLink);
      } else if (type == 'segmentation') {
        segmentation.add(driveLink);
      }
    }
  }
}