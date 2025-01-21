import {Storage} from './index.js';
import {RemoteSQL} from 'remote-sql';
import setupDB from '../schema/ts/db.sql.js';
import {sqlToStatements} from './utils.js';
import dropTables from '../schema/ts/drop.sql.js';

export class RemoteSQLStorage implements Storage {
	constructor(private db: RemoteSQL) {}

	async setup() {
		const statements = sqlToStatements(setupDB);
		// The following do not work on bun sqlite:
		//  (seems like prepared statement are partially executed and index cannot be prepared when table is not yet created)
		// await this.db.batch(statements.map((v) => this.db.prepare(v)));
		for (const statement of statements) {
			await this.db.prepare(statement).all();
		}
	}
	async reset() {
		const dropStatements = sqlToStatements(dropTables);
		const statements = sqlToStatements(setupDB);
		const allStatements = dropStatements.concat(statements);
		// The following do not work on bun sqlite:
		//  (seems like prepared statement are partially executed and index cannot be prepared when table is not yet created)
		// await this.db.batch(allStatements.map((v) => this.db.prepare(v)));
		for (const statement of allStatements) {
			await this.db.prepare(statement).all();
		}
	}
}
