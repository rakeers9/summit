import 'package:boilermakexii_2/const.dart';
import 'package:flutter/material.dart';

Map<IconData, String> settingsOptions = {
  Icons.person_3_outlined: "Edit Profile",
  Icons.notifications_active_outlined: "Edit Notifications",
  Icons.timer_outlined: "Modify Time",
  Icons.history: "History",
  Icons.report_gmailerrorred_rounded: "Report an error",
  Icons.star_rate_outlined: "Rate the App",
};

List<Widget> cards = settingsOptions.entries.map((entry) {
  return SettingsCard(title: entry.value, icon: entry.key);
}).toList();


class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {

    Size size = MediaQuery.of(context).size;

    return Scaffold(
      backgroundColor: kBackgroundColor,
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Center(child: Text("Settings", style: TextStyle(fontWeight: FontWeight.bold, fontSize: size.height * 0.04),)),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: size.width * 0.08, vertical: size.height * 0.015),
                child: Divider(
                  height: 5,
                  color: Colors.white,
                  thickness: 0.5,
                ),
              ),
              ...cards,
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

    return Card(
      color: kBackgroundColor,
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
                Text(title, style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w400)),
              ],
            ),
            Icon(Icons.arrow_forward_ios_rounded, size: size.height * 0.03, color: Colors.white,),
          ],
        ),
      ),
    );
  }
}

