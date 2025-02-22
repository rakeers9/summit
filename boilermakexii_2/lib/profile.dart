import 'dart:math';

import 'package:flutter/material.dart';

class UserProfile extends StatelessWidget {
  final String userName;
  final String profileImageUrl;

  const UserProfile({
    super.key,
    required this.userName,
    required this.profileImageUrl,
  });

  @override
  Widget build(BuildContext context) {

    Size size = MediaQuery.of(context).size;
    int score = 56;

    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Padding(
                padding: EdgeInsets.symmetric(vertical: size.height * 0.02),
                child: CircleAvatar(
                  radius: 50,
                  backgroundImage: NetworkImage(profileImageUrl),
                  backgroundColor: Colors.white,
                ),
              ),
              Text(
                userName,
                style: TextStyle(
                  fontSize: size.height * 0.025,
                  fontWeight: FontWeight.bold,
                  color: Colors.amber,
                ),
              ),
              Text(
                "Bronze",
                style: TextStyle(
                  fontSize: size.height * 0.02,
                  fontWeight: FontWeight.w300,
                  color: Colors.white,
                ),
              ),
              Text(
                "13th in Region",
                style: TextStyle(
                  fontSize: size.height * 0.017,
                  fontWeight: FontWeight.w300,
                  color: Colors.white,
                ),
              ),
              Padding(
                padding: EdgeInsets.symmetric(vertical: size.height * 0.03),
                child: Text(
                  "\$32.00",
                  style: TextStyle(
                    fontSize: size.height * 0.05,
                    fontWeight: FontWeight.w600,
                    color: Colors.white,
                  ),
                ),
              ),
              Text(
                "Current Score $score",
                style: TextStyle(
                  fontSize: size.height * 0.02,
                  fontWeight: FontWeight.w300,
                  color: Colors.white,
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 20),
                    child: SizedBox(
                      width: size.width/3,
                      height: size.height * 0.05,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          backgroundColor: Colors.amberAccent,
                          padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                        ),
                        onPressed: () {

                        },
                        child: Text(
                          "Cash Out",
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: size.height * 0.02,
                            fontWeight: FontWeight.w300,
                          ),
                        ),
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 20),
                    child: SizedBox(
                      width: size.width/3,
                      height: size.height * 0.05,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          backgroundColor: Colors.amberAccent,
                          padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                        ),
                        onPressed: () {

                        },
                        child: Text(
                          "Edit Profile",
                          style: TextStyle(
                            color: Colors.black,
                            fontSize: size.height * 0.02,
                            fontWeight: FontWeight.w300,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              ProfileInfoCard(line1: "Processing...", line2: "0",arrow: 0, date: "3/12/25",),
              ProfileInfoCard(line1: "Completed", line2: "3 Incorrect", arrow: -1, date: "3/9/25",),
              ProfileInfoCard(line1: "Completed", line2: "All Incorrect", arrow: 1, date: "3/6/25",)
            ],
          ),
        ),
      ),
    );
  }
}

class ProfileInfoCard extends StatelessWidget {
  final String line1;
  final String line2;
  final int arrow;
  final String date;

  const ProfileInfoCard({
    super.key,
    required this.line1,
    required this.line2,
    required this.arrow,
    required this.date,
  });

  @override
  Widget build(BuildContext context) {
    double angle = 0;
    IconData icons = Icons.horizontal_rule_sharp;
    if (arrow < 0) {
      icons = Icons.arrow_forward_ios_sharp;
      angle = pi * 90 / 180;
    } else if (arrow > 0) {
      icons = Icons.arrow_forward_ios_sharp;
      angle = pi * -90 / 180;
    }

    return Card(
      color: Colors.black,
      elevation: 0,
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Row(
          children: [
            Transform.rotate(
              angle: angle,
              child: Icon(
                icons,
                size: 60,
                color: Colors.grey[700],
              ),
            ),
            SizedBox(width: 12),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(date, style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
                Text(line1, style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold)),
                Visibility(visible: arrow != 0, child: Text(line2, style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w300))),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
