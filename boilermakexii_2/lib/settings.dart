import 'package:boilermakexii_2/const.dart';
import 'package:flutter/material.dart';

Map<IconData, String> settingsOptions = {
  Icons.person_3_outlined: "Edit Profile",
  Icons.notifications_active_outlined: "Edit Notifications",
  Icons.money_outlined: "Bank Details",
  Icons.history: "History",
  Icons.report_gmailerrorred_rounded: "Report an error",
  Icons.star_rate_outlined: "Rate the App",
};

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Scaffold(
      body: Container(
        height: size.height,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              pink1,
              pink2,
              cyan3,
              cyan2,
              cyan1,
              darkBlue,
            ],
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              Center(
                child: Padding(
                  padding: EdgeInsets.only(top: size.height * 0.02),
                  child: Text(
                    "Settings",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: size.height * 0.04,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.symmetric(
                    horizontal: size.width * 0.08, vertical: size.height * 0.015),
                child: Divider(
                  height: 5,
                  color: Colors.white,
                  thickness: 0.5,
                ),
              ),
              Expanded(
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: size.width * 0.08),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: settingsOptions.entries
                        .map((entry) => Expanded(
                      child: SettingsCard(title: entry.value, icon: entry.key),
                    ))
                        .toList(),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class SettingsCard extends StatelessWidget {
  final IconData icon;
  final String title;

  const SettingsCard({
    super.key,
    required this.title,
    required this.icon,
  });

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Container(
      margin: EdgeInsets.symmetric(vertical: size.height * 0.005),
      child: Card(
        color: darkBlue.withOpacity(0.5),
        elevation: 0,
        child: Padding(
          padding: const EdgeInsets.all(10.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Icon(
                    icon,
                    size: size.height * 0.04,
                    color: kAccentBlue,
                  ),
                  SizedBox(width: 12),
                  Text(
                    title,
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.w400),
                  ),
                ],
              ),
              Icon(
                Icons.arrow_forward_ios_rounded,
                size: size.height * 0.03,
                color: Colors.white,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
