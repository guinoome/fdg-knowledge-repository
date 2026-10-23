# Synthetic-only C24-P0 executed via stdin: PYTHONDONTWRITEBYTECODE=1; python -B -
import sys,json,math,unittest,io
denied=[]
def guard(event,args):
 if event=="open":
  mode=args[1]
  flags=args[2]
  if (isinstance(mode,str) and any(v in mode for v in ("w","a","x","+"))) or (isinstance(flags,int) and flags & (1|2|64|512|1024)):
   denied.append(event);raise PermissionError("Synthetic P0 forbids filesystem writes")
 if event.startswith("socket."):
  denied.append(event);raise PermissionError("Synthetic P0 forbids network")
sys.addaudithook(guard)
source='''def remaining_quantity(planned, reported):
    from math import isfinite
    values=(planned,reported)
    if any(isinstance(x,bool) or not isinstance(x,(int,float)) or not isfinite(x) for x in values):
        raise ValueError("Use finite numeric quantities in the same unit")
    if planned < 0 or reported < 0 or reported > planned:
        raise ValueError("Require 0 <= reported <= planned")
    return {"unit":"m","reported":reported,"remaining":planned-reported,"qa_accepted":None}
'''
compiled=compile(source,"<SYNTHETIC-C24-P0>","exec")
namespace={};exec(compiled,namespace);f=namespace["remaining_quantity"]
checks=[]
for name,p,r,expected in [
 ("100m less30m",100,30,70),("zero",0,0,0),("complete",100,100,0),("fraction",2.5,1.25,1.25)]:
 result=f(p,r);assert result["remaining"]==expected and result["qa_accepted"] is None
 checks.append({"name":name,"status":"PASS","result":result})
for name,p,r in [
 ("negative planned",-1,0),("negative reported",1,-1),("overreported",10,11),("text planned","100",30),("boolean",True,0),("nan",float("nan"),0),("infinity",1,float("inf"))]:
 try:f(p,r)
 except ValueError as e:checks.append({"name":name,"status":"PASS","actual":type(e).__name__,"message":str(e)})
 else:raise AssertionError(name)
print(json.dumps({"status":"PASS","compile":"PASS in memory","checks":checks,"passed":len(checks),"filesystem_or_network_events_attempted":denied,"bytecode_disabled":sys.dont_write_bytecode,"provider":"Native Codex session","model":"Inherited; exact model identity not independently observable","no_installs":True,"no_files_created":True}))
