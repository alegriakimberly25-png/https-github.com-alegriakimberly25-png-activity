import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { Pokemon } from './src/data/pokemon';
import { POKEMON_IMAGES } from './src/data/pokemonImages';
import { getPokemonList, getTeamNumbers, saveTeamNumbers } from './src/storage/pokemonStorage';

const GENERATIONS = [
  { label: 'All', first: 1, last: 1025 },
  { label: 'Gen I', first: 1, last: 151 },
  { label: 'Gen II', first: 152, last: 251 },
  { label: 'Gen III', first: 252, last: 386 },
  { label: 'Gen IV', first: 387, last: 493 },
  { label: 'Gen V', first: 494, last: 649 },
  { label: 'Gen VI', first: 650, last: 721 },
  { label: 'Gen VII', first: 722, last: 809 },
  { label: 'Gen VIII', first: 810, last: 905 },
  { label: 'Gen IX', first: 906, last: 1025 },
];

type Screen = 'pokedex' | 'team' | 'details';
type MainScreen = 'pokedex' | 'team';

export default function PokedexApp() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [teamNumbers, setTeamNumbers] = useState<string[]>([]);
  const [screen, setScreen] = useState<Screen>('pokedex');
  const [previousScreen, setPreviousScreen] = useState<MainScreen>('pokedex');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [generationIndex, setGenerationIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [teamSearchText, setTeamSearchText] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load the bundled Pokédex and the saved six-member team from this device.
  useEffect(() => {
    async function loadSavedData() {
      try {
        const savedPokemon = await getPokemonList();
        const savedTeam = await getTeamNumbers();
        const validTeam = savedTeam
          .filter((teamNumber) => savedPokemon.some((pokemon) => pokemon.number === teamNumber))
          .slice(0, 6);

        if (validTeam.length !== savedTeam.length) {
          await saveTeamNumbers(validTeam);
        }

        setPokemonList(savedPokemon);
        setTeamNumbers(validTeam);
      } catch {
        setMessage('Saved Pokédex could not be loaded.');
      } finally {
        setIsLoading(false);
      }
    }

    void loadSavedData();
  }, []);

  const selectedGeneration = GENERATIONS[generationIndex];
  const visiblePokemon = pokemonList.filter((pokemon) => {
    const number = Number(pokemon.number);
    const matchesGeneration = number >= selectedGeneration.first && number <= selectedGeneration.last;
    const search = searchText.trim().toLowerCase();
    const matchesSearch =
      !search ||
      pokemon.name.toLowerCase().includes(search) ||
      pokemon.number.includes(search) ||
      pokemon.type.toLowerCase().includes(search);
    return matchesGeneration && matchesSearch;
  });
  const teamCandidates = pokemonList.filter((pokemon) => {
    const search = teamSearchText.trim().toLowerCase();
    return (
      !search ||
      pokemon.name.toLowerCase().includes(search) ||
      pokemon.number.includes(search) ||
      pokemon.type.toLowerCase().includes(search)
    );
  });
  const teamPokemon = teamNumbers
    .map((number) => pokemonList.find((pokemon) => pokemon.number === number))
    .filter((pokemon): pokemon is Pokemon => pokemon !== undefined);

  function openDetails(pokemon: Pokemon) {
    setPreviousScreen(screen === 'details' ? previousScreen : screen);
    setSelectedPokemon(pokemon);
    setScreen('details');
  }

  // Add or remove a local Pokédex entry without changing the catalog.
  async function toggleTeam(pokemon: Pokemon) {
    const isOnTeam = teamNumbers.includes(pokemon.number);

    if (!isOnTeam && teamNumbers.length >= 6) {
      setMessage('Your team is full. Remove a Pokémon before adding another.');
      return;
    }

    const updatedTeam = isOnTeam
      ? teamNumbers.filter((number) => number !== pokemon.number)
      : [...teamNumbers, pokemon.number];

    try {
      await saveTeamNumbers(updatedTeam);
      setTeamNumbers(updatedTeam);
      setMessage(isOnTeam ? `${pokemon.name} removed from your team.` : `${pokemon.name} added to your team.`);
    } catch {
      setMessage('Your team could not be saved. Please try again.');
    }
  }

  function renderPokemonRow(pokemon: Pokemon, showTeamButton: boolean) {
    const image = POKEMON_IMAGES[pokemon.number];

    return (
      <View style={styles.pokemonRow}>
        <Pressable
          accessibilityRole="button"
          onPress={() => openDetails(pokemon)}
          style={styles.pokemonDetailsButton}
        >
          {image ? (
            <Image
              accessibilityLabel={`${pokemon.name} artwork`}
              resizeMethod="resize"
              resizeMode="contain"
              source={image}
              style={styles.pokemonImage}
            />
          ) : (
            <View style={[styles.pokemonImage, styles.imagePlaceholder]} />
          )}
          <Text style={styles.pokemonNumber}>#{pokemon.number}</Text>
          <View style={styles.pokemonInfo}>
            <Text style={styles.pokemonName}>{pokemon.name}</Text>
            <Text style={styles.pokemonType}>{pokemon.type}</Text>
          </View>
        </Pressable>
        {showTeamButton ? (
          <Pressable
            accessibilityLabel={`${teamNumbers.includes(pokemon.number) ? 'Remove' : 'Add'} ${pokemon.name} ${teamNumbers.includes(pokemon.number) ? 'from' : 'to'} team`}
            accessibilityRole="button"
            onPress={() => toggleTeam(pokemon)}
            style={({ pressed }) => [
              styles.teamButton,
              teamNumbers.includes(pokemon.number) && styles.teamButtonSelected,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text
              style={[
                styles.teamButtonText,
                teamNumbers.includes(pokemon.number) && styles.teamButtonSelectedText,
              ]}
            >
              {teamNumbers.includes(pokemon.number) ? 'Remove' : 'Add to team'}
            </Text>
          </Pressable>
        ) : null}
      </View>
    );
  }

  function renderBottomNavigation() {
    return (
      <View style={styles.bottomNavigation}>
        <Pressable
          accessibilityRole="button"
          onPress={() => setScreen('pokedex')}
          style={[styles.navigationButton, screen === 'pokedex' && styles.navigationButtonActive]}
        >
          <Text style={[styles.navigationText, screen === 'pokedex' && styles.navigationTextActive]}>
            Pokédex
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => setScreen('team')}
          style={[styles.navigationButton, screen === 'team' && styles.navigationButtonActive]}
        >
          <Text style={[styles.navigationText, screen === 'team' && styles.navigationTextActive]}>
            My Team ({teamNumbers.length}/6)
          </Text>
        </Pressable>
      </View>
    );
  }

  function renderSearchBar(value: string, onChangeText: (text: string) => void, label: string) {
    return (
      <TextInput
        accessibilityLabel={label}
        onChangeText={onChangeText}
        placeholder={label}
        placeholderTextColor="#78867d"
        returnKeyType="search"
        style={styles.searchInput}
        value={value}
      />
    );
  }

  function renderDetailScreen() {
    if (!selectedPokemon) {
      return null;
    }

    const pokemon = selectedPokemon;
    const stats = pokemon.stats;
    const statRows = [
      { label: 'HP', value: stats?.hp },
      { label: 'Attack', value: stats?.attack },
      { label: 'Defense', value: stats?.defense },
      { label: 'Sp. Attack', value: stats?.specialAttack },
      { label: 'Sp. Defense', value: stats?.specialDefense },
      { label: 'Speed', value: stats?.speed },
    ];

    return (
      <>
        <ScrollView contentContainerStyle={styles.detailPage}>
          <Pressable
            accessibilityRole="button"
            onPress={() => setScreen(previousScreen)}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
          <View style={styles.detailHeader}>
            <Text style={styles.detailNumber}>#{pokemon.number}</Text>
            {POKEMON_IMAGES[pokemon.number] ? (
              <Image
                accessibilityLabel={`${pokemon.name} artwork`}
                resizeMethod="resize"
                resizeMode="contain"
                source={POKEMON_IMAGES[pokemon.number]}
                style={styles.detailImage}
              />
            ) : null}
            <Text style={styles.detailName}>{pokemon.name}</Text>
            <Text style={styles.detailType}>{pokemon.type}</Text>
          </View>

          <Text style={styles.sectionTitle}>Base stats</Text>
          {statRows.map((stat) => (
            <View key={stat.label} style={styles.statRow}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <View style={styles.statTrack}>
                <View
                  style={[
                    styles.statFill,
                    { width: `${Math.min(((stat.value ?? 0) / 255) * 100, 100)}%` },
                  ]}
                />
              </View>
              <Text style={styles.statValue}>{stat.value ?? '—'}</Text>
            </View>
          ))}

          <Text style={[styles.sectionTitle, styles.movesHeading]}>Moves</Text>
          <Text style={styles.movesNotice}>
            Move learnsets are not included in the supplied offline dataset.
          </Text>

          <Pressable
            accessibilityRole="button"
            onPress={() => toggleTeam(pokemon)}
            style={({ pressed }) => [styles.detailTeamButton, pressed && styles.buttonPressed]}
          >
            <Text style={styles.detailTeamButtonText}>
              {teamNumbers.includes(pokemon.number) ? 'Remove from team' : 'Add to team'}
            </Text>
          </Pressable>
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </ScrollView>
        {renderBottomNavigation()}
      </>
    );
  }

  function renderPokédexHeader() {
    return (
      <View>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>LOCAL CATALOG</Text>
            <Text style={styles.title}>Pokédex</Text>
          </View>
          <View style={styles.countBox}>
            <Text style={styles.count}>{pokemonList.length}</Text>
            <Text style={styles.countLabel}>SPECIES</Text>
          </View>
        </View>
        <View style={styles.listContent}>
          {renderSearchBar(searchText, setSearchText, 'Search name, number, or type')}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.generationCarousel}>
            {GENERATIONS.map((generation, index) => (
              <Pressable
                accessibilityRole="button"
                key={generation.label}
                onPress={() => setGenerationIndex(index)}
                style={[
                  styles.generationButton,
                  generationIndex === index && styles.generationButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.generationText,
                    generationIndex === index && styles.generationTextActive,
                  ]}
                >
                  {generation.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <View style={styles.listHeading}>
            <Text style={styles.sectionTitle}>{selectedGeneration.label === 'All' ? 'All Pokémon' : selectedGeneration.label}</Text>
            <Text style={styles.entryCount}>{visiblePokemon.length} ENTRIES</Text>
          </View>
        </View>
      </View>
    );
  }

  function renderTeamHeader() {
    return (
      <View style={styles.listContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>BUILD YOUR ROSTER</Text>
            <Text style={styles.title}>My Team</Text>
          </View>
          <View style={styles.countBox}>
            <Text style={styles.count}>{teamNumbers.length}/6</Text>
            <Text style={styles.countLabel}>TEAM</Text>
          </View>
        </View>
        {teamPokemon.length === 0 ? (
          <Text style={styles.emptyText}>Your team is empty. Add up to six Pokémon below.</Text>
        ) : (
          teamPokemon.map((pokemon, index) => (
            <View key={pokemon.number} style={styles.teamMember}>
              <Pressable onPress={() => openDetails(pokemon)} style={styles.teamDetailsButton}>
                <Text style={styles.teamPosition}>{index + 1}</Text>
                {POKEMON_IMAGES[pokemon.number] ? (
                  <Image
                    accessibilityLabel={`${pokemon.name} artwork`}
                    resizeMethod="resize"
                    resizeMode="contain"
                    source={POKEMON_IMAGES[pokemon.number]}
                    style={styles.teamPokemonImage}
                  />
                ) : null}
                <View style={styles.teamPokemonInfo}>
                  <Text style={styles.teamPokemonName}>{pokemon.name}</Text>
                  <Text style={styles.teamPokemonType}>{pokemon.type}</Text>
                </View>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={() => toggleTeam(pokemon)}
                style={({ pressed }) => [styles.removeButton, pressed && styles.buttonPressed]}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </Pressable>
            </View>
          ))
        )}
        <Text style={[styles.sectionTitle, styles.addTeamHeading]}>Add to team</Text>
        {renderSearchBar(teamSearchText, setTeamSearchText, 'Search Pokémon to add')}
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    );
  }

  if (screen === 'details') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        {renderDetailScreen()}
      </SafeAreaView>
    );
  }

  const listData = screen === 'pokedex' ? visiblePokemon : teamCandidates;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <FlatList
        contentContainerStyle={styles.listContentContainer}
        data={listData}
        extraData={teamNumbers}
        keyExtractor={(pokemon) => pokemon.number}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {isLoading ? 'Loading your Pokédex...' : 'No Pokémon match this search.'}
          </Text>
        }
        ListFooterComponent={<Text style={styles.footer}>All data and artwork are stored on this device.</Text>}
        ListHeaderComponent={screen === 'pokedex' ? renderPokédexHeader() : renderTeamHeader()}
        renderItem={({ item }) => renderPokemonRow(item, screen === 'team')}
        style={styles.list}
      />
      {renderBottomNavigation()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#164638',
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContentContainer: {
    backgroundColor: '#f2f5ef',
    flexGrow: 1,
    paddingBottom: 14,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#164638',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingVertical: 22,
  },
  eyebrow: {
    color: '#b9d9c2',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 5,
  },
  title: {
    color: '#ffffff',
    fontSize: 27,
    fontWeight: '800',
  },
  countBox: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    minWidth: 66,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  count: {
    color: '#164638',
    fontSize: 18,
    fontWeight: '800',
  },
  countLabel: {
    color: '#52635a',
    fontSize: 9,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderColor: '#dce5dc',
    borderRadius: 7,
    borderWidth: 1,
    color: '#1d3027',
    fontSize: 14,
    marginBottom: 12,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  generationCarousel: {
    flexGrow: 0,
    marginBottom: 18,
  },
  generationButton: {
    alignItems: 'center',
    borderColor: '#cfd9cf',
    borderRadius: 6,
    borderWidth: 1,
    justifyContent: 'center',
    marginRight: 8,
    minHeight: 36,
    paddingHorizontal: 12,
  },
  generationButtonActive: {
    backgroundColor: '#164638',
    borderColor: '#164638',
  },
  generationText: {
    color: '#33483b',
    fontSize: 12,
    fontWeight: '700',
  },
  generationTextActive: {
    color: '#ffffff',
  },
  listHeading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#1d3027',
    fontSize: 18,
    fontWeight: '800',
  },
  entryCount: {
    color: '#68786d',
    fontSize: 10,
    fontWeight: '700',
  },
  pokemonRow: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#dce5dc',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 8,
    marginHorizontal: 18,
    minHeight: 76,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  pokemonDetailsButton: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    minWidth: 0,
  },
  pokemonImage: {
    height: 54,
    marginRight: 7,
    width: 54,
  },
  imagePlaceholder: {
    backgroundColor: '#e5ede5',
    borderRadius: 6,
  },
  pokemonNumber: {
    color: '#68786d',
    fontSize: 11,
    fontWeight: '700',
    marginRight: 7,
  },
  pokemonInfo: {
    flex: 1,
    minWidth: 0,
  },
  pokemonName: {
    color: '#1d3027',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
  },
  pokemonType: {
    color: '#68786d',
    fontSize: 11,
  },
  teamButton: {
    alignItems: 'center',
    backgroundColor: '#164638',
    borderRadius: 6,
    justifyContent: 'center',
    marginLeft: 6,
    minHeight: 36,
    minWidth: 76,
    paddingHorizontal: 8,
  },
  teamButtonSelected: {
    backgroundColor: '#e4ece4',
    borderColor: '#164638',
    borderWidth: 1,
  },
  teamButtonText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  teamButtonSelectedText: {
    color: '#164638',
  },
  teamMember: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#dce5dc',
    borderRadius: 7,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 7,
    minHeight: 56,
    paddingHorizontal: 8,
  },
  teamDetailsButton: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    minWidth: 0,
  },
  teamPosition: {
    color: '#164638',
    fontSize: 12,
    fontWeight: '800',
    width: 22,
  },
  teamPokemonImage: {
    height: 42,
    width: 42,
  },
  teamPokemonInfo: {
    flex: 1,
    minWidth: 0,
  },
  teamPokemonName: {
    color: '#1d3027',
    fontSize: 13,
    fontWeight: '700',
  },
  teamPokemonType: {
    color: '#68786d',
    fontSize: 11,
    marginTop: 2,
  },
  removeButton: {
    alignItems: 'center',
    borderColor: '#df5b45',
    borderRadius: 6,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 34,
    minWidth: 62,
    paddingHorizontal: 7,
  },
  removeButtonText: {
    color: '#b53e2b',
    fontSize: 11,
    fontWeight: '700',
  },
  addTeamHeading: {
    marginBottom: 10,
    marginTop: 16,
  },
  emptyText: {
    color: '#68786d',
    fontSize: 13,
    lineHeight: 19,
    paddingVertical: 10,
  },
  message: {
    color: '#164638',
    fontSize: 12,
    marginBottom: 8,
  },
  footer: {
    color: '#68786d',
    fontSize: 11,
    paddingHorizontal: 18,
    paddingTop: 14,
    textAlign: 'center',
  },
  bottomNavigation: {
    backgroundColor: '#ffffff',
    borderTopColor: '#dce5dc',
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  navigationButton: {
    alignItems: 'center',
    borderRadius: 6,
    flex: 1,
    justifyContent: 'center',
    minHeight: 40,
  },
  navigationButtonActive: {
    backgroundColor: '#e4ece4',
  },
  navigationText: {
    color: '#52635a',
    fontSize: 13,
    fontWeight: '700',
  },
  navigationTextActive: {
    color: '#164638',
  },
  detailPage: {
    backgroundColor: '#f2f5ef',
    flexGrow: 1,
    paddingBottom: 24,
    paddingHorizontal: 18,
  },
  backButton: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    minHeight: 46,
  },
  backButtonText: {
    color: '#164638',
    fontSize: 14,
    fontWeight: '700',
  },
  detailHeader: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#dce5dc',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 20,
    padding: 16,
  },
  detailNumber: {
    alignSelf: 'flex-end',
    color: '#68786d',
    fontSize: 12,
    fontWeight: '700',
  },
  detailImage: {
    height: 150,
    width: 150,
  },
  detailName: {
    color: '#1d3027',
    fontSize: 22,
    fontWeight: '800',
  },
  detailType: {
    color: '#68786d',
    fontSize: 13,
    marginTop: 4,
  },
  statRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 12,
  },
  statLabel: {
    color: '#33483b',
    fontSize: 12,
    width: 86,
  },
  statTrack: {
    backgroundColor: '#dce5dc',
    borderRadius: 4,
    flex: 1,
    height: 8,
    marginRight: 10,
    overflow: 'hidden',
  },
  statFill: {
    backgroundColor: '#4c9b69',
    borderRadius: 4,
    height: 8,
  },
  statValue: {
    color: '#1d3027',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'right',
    width: 28,
  },
  movesHeading: {
    marginTop: 24,
  },
  movesNotice: {
    backgroundColor: '#ffffff',
    borderColor: '#dce5dc',
    borderRadius: 7,
    borderWidth: 1,
    color: '#52635a',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 10,
    padding: 12,
  },
  detailTeamButton: {
    alignItems: 'center',
    backgroundColor: '#164638',
    borderRadius: 6,
    justifyContent: 'center',
    marginTop: 18,
    minHeight: 44,
  },
  detailTeamButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.75,
  },
});
