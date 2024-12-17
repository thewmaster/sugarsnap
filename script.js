document.addEventListener('DOMContentLoaded', () => {
    // Game variables
    const farmGrid = document.getElementById('farm-grid');
    const plantButton = document.getElementById('plantButton');
    const waterButton = document.getElementById('waterButton');
    const harvestButton = document.getElementById('harvestButton');
  
    let farmCells = [];
    let crops = []; // Stores state of each crop (planted, watered, harvested)
  
    // Initialize the farm grid
    const createFarmGrid = () => {
      for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.classList.add('farm-cell');
        cell.addEventListener('click', () => handleCellClick(i));
        farmGrid.appendChild(cell);
        farmCells.push(cell);
        crops.push({ planted: false, watered: false });
      }
    };
  
    // Handle click on farm cells
    const handleCellClick = (index) => {
      const crop = crops[index];
      if (!crop.planted) {
        alert('You need to plant a seed first!');
      } else if (!crop.watered) {
        alert('Water the crops first!');
      } else {
        alert('Harvest your crop!');
      }
    };
  
    // Plant a seed in a random empty cell
    const plantSeed = () => {
      for (let i = 0; i < crops.length; i++) {
        if (!crops[i].planted) {
          crops[i].planted = true;
          farmCells[i].classList.add('planted');
          return;
        }
      }
      alert('All plots are full!');
    };
  
    // Water crops
    const waterCrops = () => {
      for (let i = 0; i < crops.length; i++) {
        if (crops[i].planted && !crops[i].watered) {
          crops[i].watered = true;
          farmCells[i].classList.add('watered');
        }
      }
    };

    let growthTimer = setInterval(() => {
        // Increment crop growth for each planted crop
      }, 1000); // Every second
  
    // Harvest crops
    const harvestCrops = () => {
      for (let i = 0; i < crops.length; i++) {
        if (crops[i].planted && crops[i].watered) {
          crops[i].planted = false;
          crops[i].watered = false;
          farmCells[i].classList.remove('planted', 'watered');
          alert('Crop harvested!');
        }
      }
    };
  

    let money = 0;
function earnMoney() {
  money += 10; // Earn 10 money per harvest
  alert(`You earned 10! Current balance: ${money}`);
}

    // Event listeners for buttons
    plantButton.addEventListener('click', plantSeed);
    waterButton.addEventListener('click', waterCrops);
    harvestButton.addEventListener('click', harvestCrops);
  
    // Initialize the game
    createFarmGrid();
  });
  