const { BaseModel } = require('lib/base-model.js');

class Alarm extends BaseModel {

	static tableName() {
		return 'alarms';
	}

	static modelType() {
		return BaseModel.TYPE_ALARM;
	}

	static byNoteId(noteId) {
		return this.modelSelectOne('SELECT * FROM alarms WHERE note_id = ?', [noteId]);
	}

	static async deleteExpiredAlarms() {
		return this.db().exec('DELETE FROM alarms WHERE trigger_time <= ?', [Date.now()]);
	}

	static async alarmIdsWithoutNotes() {
		// https://stackoverflow.com/a/4967229/561309
		const alarms = await this.db().selectAll('SELECT alarms.id FROM alarms LEFT JOIN notes ON alarms.note_id = notes.id WHERE notes.id IS NULL');
		return alarms.map((a) => { return a.id });
	}

}

module.exports = Alarm;