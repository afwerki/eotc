import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, Modal, Button } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ProjectProposal = () => {
  const [projects, setProjects] = useState([
    { month: 'Jan', value: 20, details: 'Project details for January' },
    { month: 'Feb', value: 45, details: 'Project details for February' },
    { month: 'Mar', value: 28, details: 'Project details for March' },
    { month: 'Apr', value: 80, details: 'Project details for April' },
    { month: 'May', value: 99, details: 'Project details for May' },
    { month: 'Jun', value: 43, details: 'Project details for June' },
    { month: 'Jul', value: 50, details: 'Project details for July' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Mock database growth data for demonstration purposes
  const registrationData = [
    { date: '2023-01-01', gender: 'Male', ageGroup: '18-24', count: 5 },
    { date: '2023-01-02', gender: 'Female', ageGroup: '18-24', count: 3 },
    { date: '2023-01-03', gender: 'Male', ageGroup: '25-34', count: 4 },
    { date: '2023-01-04', gender: 'Female', ageGroup: '25-34', count: 7 },
    // Add more data points as needed...
  ];

  // Aggregate data based on date, gender, and age group
  const aggregateData = (data) => {
    const result = {};
    data.forEach(({ date, gender, ageGroup, count }) => {
      if (!result[date]) result[date] = {};
      if (!result[date][gender]) result[date][gender] = {};
      if (!result[date][gender][ageGroup]) result[date][gender][ageGroup] = 0;
      result[date][gender][ageGroup] += count;
    });
    return result;
  };

  const aggregatedData = aggregateData(registrationData);

  const dates = Object.keys(aggregatedData);
  const male18to24 = dates.map(date => aggregatedData[date]?.Male?.['18-24'] || 0);
  const female18to24 = dates.map(date => aggregatedData[date]?.Female?.['18-24'] || 0);
  const male25to34 = dates.map(date => aggregatedData[date]?.Male?.['25-34'] || 0);
  const female25to34 = dates.map(date => aggregatedData[date]?.Female?.['25-34'] || 0);

  const dataGrowth = {
    labels: dates,
    datasets: [
      {
        data: male18to24,
        color: () => '#4CAF50',
        strokeWidth: 2,
        label: 'Male 18-24',
      },
      {
        data: female18to24,
        color: () => '#FF5722',
        strokeWidth: 2,
        label: 'Female 18-24',
      },
      {
        data: male25to34,
        color: () => '#03A9F4',
        strokeWidth: 2,
        label: 'Male 25-34',
      },
      {
        data: female25to34,
        color: () => '#E91E63',
        strokeWidth: 2,
        label: 'Female 25-34',
      },
    ],
  };

  const handleBarPress = (index) => {
    setSelectedProject(projects[index]);
    setModalVisible(true);
  };

  const barData = {
    labels: projects.map(project => project.month),
    datasets: [
      {
        data: projects.map(project => project.value),
        color: () => '#4CAF50', // optional
      },
    ],
  };

  const progressData = {
    labels: ['Q2, 2020', 'Q1, 2020'],
    data: [0.4, 0.8],
    colors: ['#4CAF50', '#8BC34A'],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Database Growth Chart */}
      <View style={[styles.chartContainer, styles.lineChartContainer]}>
        <Text style={styles.chartTitle}>App users database growth</Text>
        <LineChart
          data={dataGrowth}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
        />
      </View>

      {/* Project Bar Chart */}
      <View style={[styles.chartContainer, styles.barChartContainer]}>
        <BarChart
          style={{ borderRadius: 16 }}
          data={barData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          fromZero={true}
          showBarTops={false}
          withInnerLines={false}
          onPress={(event, { index }) => handleBarPress(index)}
        />
      </View>

      {/* Progress Data Table */}
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Progress Data</Text>
        {progressData.labels.map((label, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableLabel}>{label}</Text>
            <View style={styles.tableProgressBackground}>
              <View style={[styles.tableProgress, { width: `${progressData.data[index] * 100}%`, backgroundColor: progressData.colors[index] }]} />
            </View>
            <Text style={styles.tablePercentage}>{`${progressData.data[index] * 100}%`}</Text>
          </View>
        ))}
      </View>

      {/* Modal for Project Details */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Project Details</Text>
            {selectedProject && (
              <>
                <Text style={styles.modalText}>Month: {selectedProject.month}</Text>
                <Text style={styles.modalText}>Value: {selectedProject.value}</Text>
                <Text style={styles.modalText}>Details: {selectedProject.details}</Text>
              </>
            )}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#f5f5f5',
  backgroundGradientTo: '#f5f5f5',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  decimalPlaces: 0,
  barPercentage: 0.5,
  propsForBackgroundLines: {
    strokeWidth: 0,
  },
  fillShadowGradient: '#4CAF50',
  fillShadowGradientOpacity: 1,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  lineChartContainer: {
    backgroundColor: '#E8F5E9',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  barChartContainer: {
    backgroundColor: '#E8F5E9',
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tableLabel: {
    fontSize: 14,
    color: '#4CAF50',
    width: '30%',
  },
  tableProgressBackground: {
    height: 10,
    backgroundColor: '#C8E6C9',
    borderRadius: 5,
    width: '50%',
    marginRight: 8,
  },
  tableProgress: {
    height: 10,
    borderRadius: 5,
  },
  tablePercentage: {
    fontSize: 14,
    color: '#4CAF50',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ProjectProposal;
