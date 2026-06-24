import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList, Animated, Linking } from 'react-native';

var ACTIVITIES = [
  { id: '1', name: 'My Gym Bellevue', provider: 'My Gym', category: 'Gymnastics', distance: 3.0, ageRange: '0-5', price: 75, days: 1, description: 'Structured play, songs, and physical activities. Builds coordination, strength, and social skills.', schedule: 'Multiple days available', address: 'Bellevue, WA', area: 'bellevue', interests: ['active','social','brave'], emoji: '🤸', url: 'https://www.mygym.com/bellevue' },
  { id: '2', name: 'Sunshine Music Together', provider: 'Sunshine Music', category: 'Music', distance: 2.0, ageRange: '0-5', price: 95, days: 1, description: 'Award-winning music program. Songs, instruments, rhythm, and movement in relaxed playful settings.', schedule: 'Multiple locations & times', address: 'Various - Seattle Metro', area: 'seattle', interests: ['creative','social','calm'], emoji: '🎶', url: 'https://www.sunshinemusictogether.com' },
  { id: '3', name: 'Heart Beats Music School', provider: 'Heart Beats', category: 'Music', distance: 2.5, ageRange: '0-5', price: 90, days: 1, description: 'Joyful play-based music for toddlers and caregivers. Singing, movement, and simple instruments.', schedule: 'Summer 2026 classes', address: 'Seattle, WA', area: 'seattle', interests: ['creative','social','calm'], emoji: '🥁', url: 'https://www.heartbeatsmusicschool.com' },
  { id: '4', name: 'The Little Gym Bellevue-Redmond', provider: 'The Little Gym', category: 'Gymnastics', distance: 4.0, ageRange: '0-5', price: 85, days: 1, description: 'Progressive gymnastics with tumbling, balance, and coordination. Builds confidence through movement.', schedule: 'Multiple days/times', address: 'Bellevue-Redmond, WA', area: 'redmond', interests: ['active','brave','social'], emoji: '🏅', url: 'https://www.thelittlegym.com/BellevueRedmondWA' },
  { id: '5', name: 'Seattle Gymnastics Preschool', provider: 'Seattle Gymnastics', category: 'Gymnastics', distance: 3.5, ageRange: '3-5', price: 150, days: 2, description: 'Full preschool combining gymnastics with art, science, singing, and outdoor play.', schedule: 'Mon-Fri AM sessions', address: 'Seattle, WA', area: 'seattle', interests: ['active','social','curious'], emoji: '⭐', url: 'https://seattlegymnastics.com' },
  { id: '6', name: 'The Wriggle Yoga & Music', provider: 'The Wriggle', category: 'Wellness', distance: 1.5, ageRange: '0-5', price: 80, days: 1, description: 'Playful yoga, music, and mindful games for kids and caregivers.', schedule: 'Weekly sessions', address: 'Seattle, WA', area: 'seattle', interests: ['calm','active','creative'], emoji: '🧘', url: 'https://www.thewriggle.com' },
  { id: '7', name: 'Nature Explorers Discovery Park', provider: 'Seattle Parks', category: 'Outdoors', distance: 4.0, ageRange: '3-5', price: 60, days: 1, description: 'Bug hunts, nature crafts, puddle jumping at Discovery Park. Rain or shine!', schedule: 'Fridays 10 AM-12 PM', address: 'Discovery Park, Seattle', area: 'seattle', interests: ['curious','active','brave'], emoji: '🦋', url: 'https://www.seattle.gov/parks' },
  { id: '8', name: 'Seattle Parks Swim Lessons', provider: 'Seattle Parks', category: 'Swimming', distance: 2.8, ageRange: '0-5', price: 55, days: 2, description: 'Water safety and swim basics. Parent-child classes for babies, independent for ages 4-5.', schedule: 'Mon/Wed or Tue/Thu', address: 'Various city pools', area: 'seattle', interests: ['active','brave'], emoji: '🐠', url: 'https://www.seattle.gov/parks' },
  { id: '9', name: 'Snapology STEAM Redmond', provider: 'Snapology', category: 'STEM', distance: 5.0, ageRange: '3-5', price: 120, days: 1, description: 'Hands-on STEAM with LEGO bricks and tech. Robotics, animation, and creative problem-solving!', schedule: 'Saturdays 10-11 AM', address: 'Redmond, WA', area: 'redmond', interests: ['curious','creative'], emoji: '🧱', url: 'https://www.snapology.com/washington-redmond' },
  { id: '10', name: 'Bellevue College Parent Ed', provider: 'Bellevue College', category: 'Learning', distance: 4.5, ageRange: '1-4', price: 45, days: 1, description: 'Co-op toddler classes with puzzles, art, play-dough, dramatic play, and instructor guidance.', schedule: 'Tue/Thu 9:30-11:30 AM', address: 'Bellevue College, WA', area: 'bellevue', interests: ['social','curious','creative'], emoji: '🎪', url: 'https://www.bellevuecollege.edu/parented' },
  { id: '11', name: 'Library Storytime', provider: 'Seattle Public Library', category: 'Learning', distance: 1.0, ageRange: '0-5', price: 0, days: 1, description: 'FREE interactive stories, songs, rhymes, and play. Great for language and socialization!', schedule: 'Various days by branch', address: 'Multiple branches', area: 'seattle', interests: ['calm','social','curious'], emoji: '📚', url: 'https://www.spl.org' },
  { id: '12', name: 'ARC Preschool', provider: 'ARC Seattle', category: 'Learning', distance: 2.0, ageRange: '3-5', price: 130, days: 3, description: 'Licensed preschool with art, dramatic play, cooking, science, singing, and outdoor play.', schedule: 'Mon/Wed/Fri 9 AM-12 PM', address: 'Community centers, Seattle', area: 'seattle', interests: ['social','creative','curious'], emoji: '🌈', url: 'https://arcseattle.org/programs/recreation-preschool' },
  { id: '13', name: 'Gymboree Play & Music', provider: 'Gymboree', category: 'Play', distance: 3.0, ageRange: '0-5', price: 70, days: 1, description: 'Physical, cognitive, and social development. Open gym, art labs, music, and sensory play.', schedule: 'Multiple classes daily', address: 'Seattle Metro', area: 'seattle', interests: ['active','social','creative'], emoji: '🎈', url: 'https://www.gymboreeclasses.com' },
  { id: '14', name: 'Crawlers Sensory Play', provider: 'ParentMap', category: 'Play', distance: 2.0, ageRange: '0-1', price: 35, days: 1, description: 'Obstacle courses and sensory exploration for crawlers. Supports physical confidence!', schedule: 'Weekday mornings', address: 'Seattle, WA', area: 'seattle', interests: ['active','curious'], emoji: '🐛', url: 'https://www.parentmap.com' },
  { id: '15', name: 'YMCA Early Education Redmond', provider: 'Seattle YMCA', category: 'Learning', distance: 4.5, ageRange: '1-5', price: 110, days: 2, description: 'Licensed early ed focused on learning, language, and social skills. Financial aid available.', schedule: 'Mon-Fri flexible', address: 'Redmond, WA', area: 'redmond', interests: ['social','curious','calm'], emoji: '🌟', url: 'https://www.seattleymca.org' },
  { id: '16', name: 'Kirkland Dance Academy Tots', provider: 'Kirkland Dance', category: 'Dance', distance: 4.0, ageRange: '2-5', price: 90, days: 1, description: 'Creative movement and pre-ballet for toddlers. Rhythm, coordination, and self-expression.', schedule: 'Saturdays 9:30-10:15 AM', address: 'Kirkland, WA', area: 'kirkland', interests: ['creative','active','social'], emoji: '💃', url: 'https://www.kirklanddance.com' },
  { id: '17', name: 'Issaquah Parks Tiny Tots', provider: 'Issaquah Parks', category: 'Play', distance: 7.0, ageRange: '1-4', price: 50, days: 1, description: 'Structured play with crafts, music, outdoor play, and social time. Small class sizes.', schedule: 'Tuesdays 10-11:30 AM', address: 'Issaquah Community Center', area: 'issaquah', interests: ['social','creative','active'], emoji: '🎨', url: 'https://www.issaquahwa.gov/parks' },
  { id: '18', name: 'Sammamish Nature Tots', provider: 'Sammamish Parks', category: 'Outdoors', distance: 8.0, ageRange: '2-5', price: 65, days: 1, description: 'Guided nature walks at Beaver Lake Park. Animal spotting, leaf collecting, sensory nature play.', schedule: 'Wednesdays 10-11:30 AM', address: 'Beaver Lake Park, Sammamish', area: 'sammamish', interests: ['curious','active','calm'], emoji: '🌿', url: 'https://www.sammamish.us/parks' },
  { id: '19', name: 'Mercer Island Swim Club Tots', provider: 'MI Community Ctr', category: 'Swimming', distance: 5.5, ageRange: '0-5', price: 85, days: 2, description: 'Small group swim at Mary Wayte Pool. Parent-tot and preschool levels. Warm water pool.', schedule: 'Tue/Thu 9:30-10 AM', address: 'Mercer Island Community Ctr', area: 'mercer_island', interests: ['active','brave'], emoji: '🏊', url: 'https://www.mercerisland.gov/parksrec' },
  { id: '20', name: 'Newcastle Soccer Sprouts', provider: 'Newcastle Parks', category: 'Sports', distance: 4.5, ageRange: '3-5', price: 70, days: 1, description: 'Intro soccer for preschoolers at Lake Boren Park. Fun, movement, and teamwork.', schedule: 'Saturdays 10-10:45 AM', address: 'Lake Boren Park, Newcastle', area: 'newcastle', interests: ['active','social','brave'], emoji: '⚽', url: 'https://www.newcastlewa.gov/parks' },
  { id: '21', name: 'Kiddie Academy Kirkland', provider: 'Kiddie Academy', category: 'Learning', distance: 4.2, ageRange: '0-5', price: 140, days: 3, description: 'Life Essentials curriculum with character ed, STEM, fitness, and creative arts.', schedule: 'Mon-Fri 7 AM-6 PM', address: 'Kirkland, WA', area: 'kirkland', interests: ['social','curious','creative'], emoji: '🏫', url: 'https://kiddieacademy.com/academies/kirkland' },
  { id: '22', name: 'Redmond Toddler Art Studio', provider: 'Creative Kids', category: 'Arts', distance: 5.5, ageRange: '2-5', price: 80, days: 1, description: 'Messy art play! Finger painting, clay, collage, and sensory art. Take-home projects weekly.', schedule: 'Thursdays 10-11 AM', address: 'Redmond Town Center area', area: 'redmond', interests: ['creative','calm','curious'], emoji: '🖌️', url: 'https://www.redmond.gov/parks' },
  { id: '23', name: 'Bellevue Aquatic Center Tots', provider: 'Bellevue Parks', category: 'Swimming', distance: 3.5, ageRange: '0-5', price: 75, days: 2, description: 'Warm-water tot pool swim lessons. Water confidence, safety, and basic strokes.', schedule: 'Mon/Wed 10-10:30 AM', address: 'Bellevue Aquatic Center', area: 'bellevue', interests: ['active','brave'], emoji: '💦', url: 'https://bellevuewa.gov/city-government/departments/parks' },
  { id: '24', name: 'Issaquah Music Garden', provider: 'Music Garden', category: 'Music', distance: 7.5, ageRange: '0-4', price: 85, days: 1, description: 'Kindermusik-inspired classes. Live guitar, singing, dancing, and percussion in a cozy studio.', schedule: 'Fridays 9:30-10:15 AM', address: 'Issaquah Highlands, WA', area: 'issaquah', interests: ['creative','calm','social'], emoji: '🎸', url: 'https://www.musicgardenkids.com' },
  { id: '25', name: 'Sammamish Tiny Tumblers', provider: 'Eastside Gymnastics', category: 'Gymnastics', distance: 8.5, ageRange: '2-5', price: 95, days: 1, description: 'Mini obstacle courses, balance beams, and tumbling. Gross motor skills and confidence!', schedule: 'Mondays 10-10:45 AM', address: 'Sammamish, WA', area: 'sammamish', interests: ['active','brave','social'], emoji: '🌟', url: 'https://www.eastsidegymnastics.com' },
  { id: '26', name: 'Kirkland Library Baby Bounce', provider: 'KCLS', category: 'Learning', distance: 3.8, ageRange: '0-2', price: 0, days: 1, description: 'FREE! Bouncy rhymes, songs, and board books for babies and toddlers. No registration needed.', schedule: 'Wednesdays 10:30 AM', address: 'Kirkland Library', area: 'kirkland', interests: ['calm','social'], emoji: '📖', url: 'https://kcls.org/locations/kirkland-library' },
  { id: '27', name: 'Newcastle Little Explorers', provider: 'Newcastle Parks', category: 'Outdoors', distance: 4.0, ageRange: '2-5', price: 55, days: 1, description: 'Trail walks at Coal Creek Park. Creek splashing, rock collecting, and nature journaling.', schedule: 'Tuesdays 9:30-11 AM', address: 'Coal Creek Park, Newcastle', area: 'newcastle', interests: ['curious','active','calm'], emoji: '🪨', url: 'https://www.newcastlewa.gov/parks' },
  { id: '28', name: 'Mercer Island Preschool Art', provider: 'MI Parks & Rec', category: 'Arts', distance: 5.0, ageRange: '3-5', price: 95, days: 1, description: 'Mixed media art: paint, clay, weaving, and printmaking. Inspired by famous artists!', schedule: 'Thursdays 1-2 PM', address: 'Mercer Island Community Ctr', area: 'mercer_island', interests: ['creative','calm','curious'], emoji: '🎭', url: 'https://www.mercerisland.gov/parksrec' },
];

var INTEREST_OPTIONS = [
  { id: 'active', label: 'Active & Energetic', icon: '🏃', color: '#FF6B6B' },
  { id: 'creative', label: 'Creative & Artsy', icon: '🎨', color: '#A855F7' },
  { id: 'curious', label: 'Curious Explorer', icon: '🔭', color: '#3B82F6' },
  { id: 'social', label: 'Social Butterfly', icon: '🦋', color: '#EC4899' },
  { id: 'calm', label: 'Calm & Mindful', icon: '🌸', color: '#14B8A6' },
  { id: 'brave', label: 'Brave Adventurer', icon: '🦁', color: '#F59E0B' },
];

var AREA_OPTIONS = [
  { id: 'any', label: '🗺️ Anywhere in Greater Seattle Metro' },
  { id: 'seattle', label: '🏙️ Seattle' },
  { id: 'bellevue', label: '🌆 Bellevue' },
  { id: 'kirkland', label: '⛵ Kirkland' },
  { id: 'redmond', label: '💻 Redmond' },
  { id: 'issaquah', label: '⛰️ Issaquah' },
  { id: 'sammamish', label: '🌲 Sammamish' },
  { id: 'mercer_island', label: '🏝️ Mercer Island' },
  { id: 'newcastle', label: '🏡 Newcastle' },
];

var MASCOTS = ['🐻', '🐰', '🦊', '🐸', '🐨', '🦄', '🐼', '🐱', '🐙', '🦉'];

function BouncingMascot(props) {
  var bounce = useState(function() { return new Animated.Value(0); })[0];
  useEffect(function() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, { toValue: -10, duration: 600, useNativeDriver: true }),
        Animated.timing(bounce, { toValue: 0, duration: 600, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return (
    <Animated.Text style={{fontSize: props.size || 40, transform: [{translateY: bounce}], marginHorizontal: 5}}>
      {props.emoji}
    </Animated.Text>
  );
}

function filterActivities(interests, maxDays, commute, area, age) {
  return ACTIVITIES.filter(function(a) {
    var parts = a.ageRange.split('-');
    var ageMin = parseInt(parts[0]);
    var ageMax = parseInt(parts[1]);
    if (age < ageMin || age > ageMax) return false;
    if (a.distance > commute) return false;
    if (a.days > maxDays) return false;
    if (area !== 'any' && a.area !== area) return false;
    if (interests.length > 0) {
      var match = false;
      for (var i = 0; i < interests.length; i++) {
        if (a.interests.indexOf(interests[i]) !== -1) { match = true; break; }
      }
      if (!match) return false;
    }
    return true;
  }).sort(function(a, b) {
    if (interests.length === 0) return a.distance - b.distance;
    var scoreA = 0;
    var scoreB = 0;
    for (var i = 0; i < interests.length; i++) {
      if (a.interests.indexOf(interests[i]) !== -1) scoreA++;
      if (b.interests.indexOf(interests[i]) !== -1) scoreB++;
    }
    if (scoreB !== scoreA) return scoreB - scoreA;
    return a.distance - b.distance;
  });
}

export default function App() {
  var [screen, setScreen] = useState('welcome');
  var [childName, setChildName] = useState('');
  var [childAge, setChildAge] = useState('');
  var [interests, setInterests] = useState([]);
  var [maxDays, setMaxDays] = useState(2);
  var [commute, setCommute] = useState(5);
  var [area, setArea] = useState('any');
  var [results, setResults] = useState([]);
  var [selected, setSelected] = useState(null);
  var [mascot] = useState(MASCOTS[Math.floor(Math.random() * MASCOTS.length)]);

  function toggleInterest(id) {
    if (interests.indexOf(id) !== -1) {
      setInterests(interests.filter(function(x) { return x !== id; }));
    } else {
      setInterests(interests.concat([id]));
    }
  }

  function doSearch() {
    var age = parseInt(childAge) || 3;
    var filtered = filterActivities(interests, maxDays, commute, area, age);
    setResults(filtered);
    setScreen('results');
  }

  if (screen === 'detail' && selected) {
    return (
      <ScrollView style={st.container}>
        <TouchableOpacity style={st.back} onPress={function() { setScreen('results'); }}>
          <Text style={st.backText}>Back to Results</Text>
        </TouchableOpacity>
        <View style={st.dHead}>
          <Text style={{fontSize: 50, textAlign: 'center'}}>{selected.emoji}</Text>
          <Text style={st.dTitle}>{selected.name}</Text>
          <Text style={st.dSub}>{selected.provider}</Text>
          <View style={st.catBadge}>
            <Text style={st.catBadgeText}>{selected.category}</Text>
          </View>
        </View>
        <View style={st.infoRow}>
          <View style={st.infoBoxOrange}>
            <Text style={{fontSize: 20}}>📍</Text>
            <Text style={st.infoVal}>{selected.distance} mi</Text>
          </View>
          <View style={st.infoBoxGreen}>
            <Text style={{fontSize: 20}}>👶</Text>
            <Text style={st.infoVal}>{selected.ageRange} yrs</Text>
          </View>
          <View style={st.infoBoxBlue}>
            <Text style={{fontSize: 20}}>💰</Text>
            <Text style={st.infoVal}>{selected.price === 0 ? 'FREE!' : '$' + selected.price}</Text>
          </View>
        </View>
        <View style={st.sect}>
          <Text style={st.sectT}>🌟 About</Text>
          <Text style={st.sectB}>{selected.description}</Text>
        </View>
        <View style={st.sect}>
          <Text style={st.sectT}>📅 Schedule</Text>
          <Text style={st.sectB}>{selected.schedule}</Text>
          <Text style={st.sectB}>{selected.days} day(s) per week</Text>
        </View>
        <View style={st.sect}>
          <Text style={st.sectT}>📍 Location</Text>
          <Text style={st.sectB}>{selected.address}</Text>
        </View>
        <TouchableOpacity style={st.greenBtn} onPress={function() { Linking.openURL(selected.url); }}>
          <Text style={st.btnTxt}>🎉 Visit Website to Sign Up!</Text>
        </TouchableOpacity>
        <View style={{height: 40}} />
      </ScrollView>
    );
  }

  if (screen === 'results') {
    return (
      <View style={st.container}>
        <TouchableOpacity style={st.back} onPress={function() { setScreen('form'); }}>
          <Text style={st.backText}>Adjust Preferences</Text>
        </TouchableOpacity>
        <View style={st.resultBanner}>
          <BouncingMascot emoji={mascot} size={28} />
          <Text style={st.rHeader}>
            {results.length} adventures for {childName || 'your little one'}!
          </Text>
        </View>
        {results.length === 0 ? (
          <View style={st.empty}>
            <Text style={{fontSize: 50}}>🙈</Text>
            <Text style={st.emptyT}>No activities found!</Text>
            <Text style={st.emptyH}>Try "Anywhere" for area or increase commute distance.</Text>
          </View>
        ) : null}
        <FlatList
          data={results}
          keyExtractor={function(x) { return x.id; }}
          contentContainerStyle={{padding: 16}}
          renderItem={function(obj) {
            var a = obj.item;
            var colors = ['#FF6B6B','#A855F7','#3B82F6','#14B8A6','#F59E0B','#EC4899'];
            var c = colors[parseInt(a.id) % colors.length];
            return (
              <TouchableOpacity style={[st.card, {borderLeftWidth: 5, borderLeftColor: c}]} onPress={function() { setSelected(a); setScreen('detail'); }}>
                <View style={st.cardTop}>
                  <Text style={{fontSize: 28, marginRight: 10}}>{a.emoji}</Text>
                  <View style={{flex: 1}}>
                    <Text style={st.cardTitle}>{a.name}</Text>
                    <Text style={st.cardSub}>{a.category} | {a.provider}</Text>
                  </View>
                  <Text style={[st.cardPrice, {color: c}]}>{a.price === 0 ? 'FREE!' : '$' + a.price}</Text>
                </View>
                <Text style={st.cardInfo}>📍 {a.distance} mi  |  👶 Ages {a.ageRange}  |  📅 {a.days}x/wk</Text>
                <Text style={st.cardDesc} numberOfLines={2}>{a.description}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }

  if (screen === 'form') {
    return (
      <ScrollView style={st.container}>
        <View style={st.fHead}>
          <BouncingMascot emoji={mascot} size={40} />
          <Text style={st.fTitle}>What does {childName || 'your little one'} love?</Text>
        </View>
        <View style={st.fSect}>
          <Text style={st.label}>🌈 Interests (pick all that fit!)</Text>
          <View style={st.grid}>
            {INTEREST_OPTIONS.map(function(opt) {
              var on = interests.indexOf(opt.id) !== -1;
              return (
                <TouchableOpacity key={opt.id} style={[st.intChip, on && {backgroundColor: opt.color, borderColor: opt.color}]} onPress={function() { toggleInterest(opt.id); }}>
                  <Text style={{fontSize: 18}}>{opt.icon}</Text>
                  <Text style={[st.intTxt, on && {color:'#fff'}]}>{opt.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={st.fSect}>
          <Text style={st.label}>📅 Days per week available</Text>
          <View style={st.row}>
            {[{id:1,label:'1 day'},{id:2,label:'2 days'},{id:3,label:'3+ days'}].map(function(opt) {
              var on = maxDays === opt.id;
              return (
                <TouchableOpacity key={opt.id} style={[st.dayChip, on && {backgroundColor:'#3B82F6',borderColor:'#3B82F6'}]} onPress={function() { setMaxDays(opt.id); }}>
                  <Text style={[st.dayTxt, on && {color:'#fff'}]}>{opt.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={st.fSect}>
          <Text style={st.label}>🚗 Max commute distance</Text>
          <View style={st.row}>
            {[{id:3,label:'3 mi'},{id:5,label:'5 mi'},{id:10,label:'10 mi'},{id:15,label:'15 mi'}].map(function(opt) {
              var on = commute === opt.id;
              return (
                <TouchableOpacity key={opt.id} style={[st.dayChip, on && {backgroundColor:'#14B8A6',borderColor:'#14B8A6'}]} onPress={function() { setCommute(opt.id); }}>
                  <Text style={[st.dayTxt, on && {color:'#fff'}]}>{opt.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={st.fSect}>
          <Text style={st.label}>📍 Preferred area</Text>
          {AREA_OPTIONS.map(function(opt) {
            var on = area === opt.id;
            return (
              <TouchableOpacity key={opt.id} style={[st.areaOpt, on && {backgroundColor:'#F59E0B',borderColor:'#F59E0B'}]} onPress={function() { setArea(opt.id); }}>
                <Text style={[st.areaTxt, on && {color:'#fff',fontWeight:'bold'}]}>{opt.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity style={st.searchBtn} onPress={doSearch}>
          <Text style={st.btnTxt}>🔍 Find Adventures!</Text>
        </TouchableOpacity>
        <View style={{height: 40}} />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={st.container}>
      <View style={st.hero}>
        <View style={st.mascotRow}>
          <BouncingMascot emoji="🦊" size={36} />
          <BouncingMascot emoji="🐻" size={44} />
          <BouncingMascot emoji="🦄" size={36} />
        </View>
        <Text style={st.heroTitle}>KidPath</Text>
        <Text style={st.heroSub}>Greater Seattle Metro Activities</Text>
        <Text style={st.heroTag}>Ages 0-5 | Personalized for your child</Text>
      </View>
      <View style={st.welcome}>
        <View style={st.speechBubble}>
          <Text style={st.speechText}>Hi! I'm {mascot} your activity buddy! Let me find awesome things for your kiddo!</Text>
        </View>
        <Text style={st.label}>👶 Child's name</Text>
        <TextInput style={st.input} placeholder="e.g., Emma, Liam, Aria..." value={childName} onChangeText={setChildName} />
        <Text style={st.label}>🎂 Child's age (0-5)</Text>
        <TextInput style={st.input} placeholder="e.g., 3" value={childAge} onChangeText={setChildAge} keyboardType="numeric" maxLength={1} />
        <TouchableOpacity style={st.goBtn} onPress={function() { setScreen('form'); }}>
          <Text style={st.btnTxt}>Let's Go! 🚀</Text>
        </TouchableOpacity>
      </View>
      <View style={st.cities}>
        <Text style={st.citiesTitle}>🗺️ Covering Greater Seattle Metro</Text>
        <Text style={st.citiesText}>Seattle | Bellevue | Kirkland | Redmond | Issaquah | Sammamish | Mercer Island | Newcastle</Text>
      </View>
    </ScrollView>
  );
}

var st = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFBF0' },
  hero: { backgroundColor: '#6C63FF', padding: 25, paddingTop: 55, alignItems: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  mascotRow: { flexDirection: 'row', marginBottom: 10 },
  heroTitle: { fontSize: 38, fontWeight: 'bold', color: '#fff' },
  heroSub: { fontSize: 15, color: '#E8E6FF', marginTop: 6 },
  heroTag: { fontSize: 12, color: '#C8C3FF', marginTop: 6, backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  welcome: { padding: 20 },
  speechBubble: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 2, borderColor: '#FFD93D' },
  speechText: { fontSize: 16, color: '#333', lineHeight: 22, textAlign: 'center' },
  cities: { padding: 20, alignItems: 'center' },
  citiesTitle: { fontSize: 14, fontWeight: 'bold', color: '#666' },
  citiesText: { fontSize: 12, color: '#888', marginTop: 6, textAlign: 'center' },
  label: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 8, marginTop: 14 },
  input: { backgroundColor: '#fff', borderRadius: 16, padding: 14, fontSize: 16, borderWidth: 2, borderColor: '#E8E8E8' },
  goBtn: { backgroundColor: '#FF6B6B', marginTop: 24, padding: 16, borderRadius: 16, alignItems: 'center' },
  searchBtn: { backgroundColor: '#FF6B6B', margin: 16, padding: 16, borderRadius: 16, alignItems: 'center' },
  greenBtn: { backgroundColor: '#4CAF50', margin: 16, padding: 16, borderRadius: 16, alignItems: 'center' },
  btnTxt: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  back: { padding: 16, paddingTop: 50 },
  backText: { fontSize: 15, color: '#6C63FF', fontWeight: '600' },
  fHead: { backgroundColor: '#A855F7', padding: 20, paddingTop: 50, alignItems: 'center', borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
  fTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginTop: 8 },
  fSect: { padding: 16, paddingBottom: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  row: { flexDirection: 'row', flexWrap: 'wrap' },
  intChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 20, backgroundColor: '#fff', borderWidth: 2, borderColor: '#E8E8E8', margin: 4 },
  intTxt: { fontSize: 13, color: '#333', marginLeft: 6 },
  dayChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: '#fff', borderWidth: 2, borderColor: '#E8E8E8', margin: 4 },
  dayTxt: { fontSize: 14, color: '#333', fontWeight: '500' },
  areaOpt: { padding: 12, borderRadius: 12, backgroundColor: '#fff', marginBottom: 6, borderWidth: 2, borderColor: '#E8E8E8' },
  areaTxt: { fontSize: 14, color: '#333' },
  resultBanner: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8 },
  rHeader: { fontSize: 16, fontWeight: 'bold', color: '#333', marginLeft: 8 },
  empty: { padding: 30, alignItems: 'center' },
  emptyT: { fontSize: 18, color: '#666', marginTop: 10 },
  emptyH: { fontSize: 14, color: '#888', marginTop: 6, textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 14, marginBottom: 12 },
  cardTop: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  cardSub: { fontSize: 12, color: '#888' },
  cardPrice: { fontSize: 15, fontWeight: 'bold' },
  cardInfo: { fontSize: 12, color: '#666', marginTop: 6 },
  cardDesc: { fontSize: 13, color: '#555', marginTop: 4 },
  dHead: { backgroundColor: '#FF6B6B', padding: 20, alignItems: 'center', borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
  dTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginTop: 8, textAlign: 'center' },
  dSub: { fontSize: 15, color: 'rgba(255,255,255,0.85)', marginTop: 3 },
  catBadge: { backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginTop: 8 },
  catBadgeText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  infoRow: { flexDirection: 'row', padding: 12 },
  infoBoxOrange: { flex: 1, borderRadius: 12, padding: 12, alignItems: 'center', backgroundColor: '#FFF3E0', marginHorizontal: 4 },
  infoBoxGreen: { flex: 1, borderRadius: 12, padding: 12, alignItems: 'center', backgroundColor: '#E8F5E9', marginHorizontal: 4 },
  infoBoxBlue: { flex: 1, borderRadius: 12, padding: 12, alignItems: 'center', backgroundColor: '#E3F2FD', marginHorizontal: 4 },
  infoVal: { fontSize: 15, fontWeight: 'bold', color: '#333', marginTop: 4 },
  sect: { padding: 14 },
  sectT: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  sectB: { fontSize: 14, color: '#555', lineHeight: 20 },
});
