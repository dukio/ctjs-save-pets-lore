import { isSkyblock } from 'dukioooo'

// prettier-ignore
const petsSlots = [
	10,11,12,13,14,15,16,
	19,20,21,22,23,24,25,
	28,29,30,31,32,33,34,
	37,38,39,40,41,42,43,
]

let lastInventory = null

register('guiRender', function () {
	if (!isSkyblock()) {
		return
	}

	const inventory = Player.getOpenedInventory()

	// Caching inventory id to prevent running the code multiple times for the same window
	if (lastInventory === inventory.getWindowId()) {
		return
	}
	if (
		inventory.getStackInSlot(49).getName().removeFormatting() !==
		'tile.air.name'
	) {
		lastInventory = inventory.getWindowId()
	}

	// Checking if it's a calendar window
	if (!inventory || !/^\(\d\/\d\) Pets$/g.test(inventory.getName())) {
		return
	}

	petsSlots.forEach((slotId) => {
		const item = inventory.getStackInSlot(slotId)

		if (!item || !item.getName().removeFormatting().startsWith('[Lvl ')) {
			return
		}

		FileLib.write(
			'save-pets-lore/write',
			`${item.getName().removeFormatting()}.json`,
			JSON.stringify(item.getLore(), null, '\t')
		)
	})
})
