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
                      height: size.height * 0.06,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          backgroundColor: Colors.amberAccent,
                          padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
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
                      height: size.height * 0.06,
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          backgroundColor: Colors.amberAccent,
                          padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
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
              )
            ],
          ),
        ),
      ),
    );
  }
}
