import sqlite3
import json

def get_tbl(tbl_name):
    database = r"db.sqlite"
    conn = sqlite3.connect(database) #create_connection(database)
    cur = conn.cursor()
    cur.execute(f"select * from {tbl_name}")
    temp_tbl = cur.fetchall()
   # for row in con_tbl:
    #    print(row)
    return(temp_tbl)
#get_tbl("consumption") 
con_tbl = get_tbl("consumption") 
gen_tbl = get_tbl("generation") 
emm_tbl = get_tbl("emissions") 
con_json = json.dumps(con_tbl)
gen_json = json.dumps(gen_tbl)
emm_json = json.dumps(emm_tbl)
print(type(con_tbl))