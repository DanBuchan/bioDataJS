# bioDataJS version 0.1

## Intro

This is a fairly lightweight javascript module for representing biological
sequence data and annotations on that sequence data. Currently some support for
some basic file parsing for some standard bioinfortmatics file formats is
included. The general structure is a nest hierarchy of objects which represent
types of biological sequence. The main idea here is to provide a simple,
standard way to represent biological sequences such you can build interoperable
javascript libraries for bioscience web applications.

## Object hierarchy

The objects sit in a nested hierarchy, with Residue being the final
possible leaf node object. The Sequence object can be thought of as the main
object or workhorse object.You can create objects at any level of the hierarchy
and your code/application does not need to use or support all levels of
hierarchy.

| Object      | Relationship    | Child Object(s) |
| ----------- | --------------- | --------------- |
| genome      | has one or more | chromosome      |
| chromsome   | has one or more | gene            |
| gene        | has one or more | transcripts     |
| transcript  | has one or more | rna             |
| rna         | has one         | protein         |
| protein     | has one or more | residue         |
| residue     | N/A             | N/A             |

## Object Layout  

All of these objects function in the same way. When you call the constructor/function you get back a javascript object which contains many similar
fields/keys. Here's the Sequence object

```
let seq_data = {
  identity: "sequence",
  sequence: seq,
  type: type,
  source: source,
  residues: residue_array,
  annotations: annotations,
};
```

Each object has an 'identity' field so you can test what class of object it is.
Sequence is a string containing the sequence in single letter DNA or RNA code.
'Type' is an optional field that indicates what class of object this is. In the
Sequence case this can be one of aminoacid or nucleotide. 'Source' is a string
which should contain the path to the course file or an URI to a source resource
online, or you can store any other such location identifier. If an object
supports nesting it will have a field to store the objects of its nested class.
For the sequence class a sequence can have an array of residue objects and in
this case this is stored in the 'residues' field. All objects have an
'annotations' class, this is a nested object for storing key:value pairs of
annotations that apply to this class of object. Currently there is no strict
format for the annotations object to leave this flexible to store data as
needed.

## Functions and the objects they return

### Genome

#### Usage

```
import { genome } from 'genome.js';
genome(chromosome=[], annotations={}, source='', genus='', species='')
```

|  Parameter  | Description                         |
| ----------- | ----------------------------------- |
| chromosome  | An array of chromosome objects      |
| annotations | An object of key:value annotations  |
| source      | String representing the data source |
| genus       | String of the species genus         |
| species     | String given the species            |

#### Output

```
{
  identity: "chromosome"
  chromosome: ARRAY OF CHROMOSOMES
  source: STRING,
  annotations: OBJECT,
  genus: STRING,
  species: STRING,
}
```

### Chromosome

#### Usage

```
import { chromosome } from 'chromosome.js';
chromosome(genes=[], annotations={}, source='', type="chromosome")
```

|  Parameter  | Description                             |
| ----------- | --------------------------------------- |
| genes       | An array of gene objects                |
| annotations | An object of key:value annotations      |
| source      | String representing the data source     |
| type        | String of the type of chromosome object |

type must be one of 'chromosome','plasmid', 'mitochondrial' or 'chloroplast'

#### Output

```
{
  identity: "chromosome",
  type: STRING,
  genes: ARRAY OF GENES,
  source: STRING,
  annotations: OBJECT,
}
```

### Gene

#### Usage

```
import { gene } from 'chromsome.js';
gene(gene_sequence, transcripts=[], annotations={}, source='')
```

|  Parameter    | Description                             |
| ------------- | --------------------------------------- |
| gene_sequence | String or sequence object               |
| transcripts   | An array of transcript objects          |
| source        | String representing the data source     |
| annotations   | An object of key:value annotations      |

gene_sequence must be a valid single letter nucleotide string or a sequence
object of type 'nucleotide'

#### Output

```
{
  identity: "gene",
  sequence: SEQUENCE OBJECT,
  transcripts: ARRAY OF TRANSCRIPTS,
  source: STRING,
  annotations: OBJECT,
}
```

### Transcript

#### Usage

```
import { transcript } from 'transcript.js';
transcript(transcript_sequence, rna=[], annotations={}, source='')
```

|  Parameter          | Description                             |
| ------------------- | --------------------------------------- |
| transcript_sequence | String or sequence object               |
| rna                 | An array of transcript objects          |
| source              | String representing the data source     |
| annotations         | An object of key:value annotations      |

transcript_sequence must be a valid single letter nucleotide string or a
sequence object of type 'nucleotide'

#### Output

```
{
  identity: "transcript",
  sequence: SEQUENCE OBJECT,
  rnas: ARRAY OF RNAs,
  source: STRING,
  annotations: OBJECT,
}
```

### RNA

#### Usage

```
import { rna } from 'rna.js';
rna(rna_sequence, rna_protein={}, annotations={}, source='', type="mrna")
```

|  Parameter   | Description                         |
| ------------ | ----------------------------------- |
| rna_sequence | String or sequence object           |
| rna_protein  | Optional protein sequence object    |
| source       | String representing the data source |
| annotations  | An object of key:value annotations  |
| type         | String indicating RNA type          |

rna_protein takes a single protein obejct for use when type is set to mrna.
type lets you set the class of RNA, defaults to 'mrna' but obviously snrna,
ncrna, trna etc.... can be set

#### Output

```
{
  identity: "rna",
  type: STRING,
  sequence: SEQUENCE OBJECT,
  protein: PROTEIN OBJECT,
  source: STRING,
  annotations: OBJECT,
}
```

### Sequence

#### Usage

```
import { sequence } from 'sequence.js';
sequence(seq, type='aminoacid', annotations={}, source='', residue_annotations=[])
```

|  Parameter          | Description                                       |
| ------------------- | ------------------------------------------------- |
| seq                 | String of residues or nucleotides                 |
| type                | String representing sequence type                 |
| annotations         | An object of key:value annotations                |
| source              | String representing the data source               |
| residue_annotations | sequential array of items to label residues with  |

type must be one of 'aminoacid' or 'nucleotide'
residue_annotations takes an array typically an array of objects. To use to
create an array of residues objects with their annotations. You should ensure
the array has the same sequential order as the seq string you've used

#### Output

```
{
  identity: "sequence",
  sequence: STRING,
  type: STRING,
  source: STRING,
  residues: ARRAY OF RESIDUES,
  annotations: OBJECT,
}
```

### Residue

#### Usage

```
import { residue } from 'residue.js';
residue(residue, type='aminoacid', annotations={})
```

|  Parameter  | Description                               |
| ------------| ----------------------------------------- |
| residue     | Single Character representing the residue |
| type        | String representing residue type          |
| annotations | An object of key:value annotations        |

type must be one of 'aminoacid' or 'nucleotide'

#### Output

```
{
  identity: "residue",
  residue: CHARACTER,
  type: STRING,
  annotations: OBJECT,
}
```

## Building nested objects

Typically you create the inner object and pass it in to it's parent. Consider
this code block from the Uniprot Parser:

```
sequence_features.forEach(function(feature){
  for(var i = feature.start-1; i < feature.stop; i+=1){
    residue_features[i] = {annotation: feature.feature_name, evidence: feature.evidence, note: feature.note}
  }
});

let seq_data = sequence(seq, undefined, sequence_features, location, residue_features);

let protein_data = protein(seq_data, protein_features, location);
```

First we loop over an array of sequence features an create an array called
'residue_feature' where each entry is some information about an annotation
for that residue.

Next we create a sequence passing in the information that we want and the
array of residue annotations. With the sequence object created we can use it to
create the protein object.

## Parsers

We offer a range of parsers. For historical reasons the file types from the
PSIPRED Web Server are over represented (http://bioinf.cs.ucl.ac.uk/psipred/)

### Fasta
```
let fasta_parsed = await parseFastaFormat(fasta_file);
```
returns sequence object

### Uniprot
```
let uniprot_parsed = await parseUniprotFormat(uniprot_file);
```
returns protein object

### HHSuite
```
let hhsuite_parsed = await parseHHSuiteFormat(seq, hhsuite_file);
```
returns sequence object
requires that you pass in the sequence string

### Blast
```
let blast_parsed = await parseBlastFormat(seq, blast_file);
```
returns sequence object
requires that you pass in the sequence string

### PSIPRED Parsers
```
let hformat_parsed = await parseHFormat(horiz_path);
let ss2_parsed = await parseSS2Format(ss2_path);
let comb_parsed = await parseCombFormat(comb_path);
let pbdat_parsed = await parsePbdatFormat(pbdat_path);
let memsatsvm_parsed = await parseMemsatSVMFormat(test_seq, memsatsvm_path);
let presults_parsed = await parsePResultsFormat(test_seq, presults_path);
let align_parsed = await parseAlignFormat(test_seq, align_path);
let psicov_parsed = await parsePsicovFormat(test_seq, psicov_path);
let con_parsed = await parsePsicovFormat(test_seq, con_path);
let mp_lipid_parsed = await parseMPLipidFormat(test_seq, mp_lipid_path);
let mp_contact_parsed = await parseMPContactFormat(test_seq, mp_contact_path);
let dom_presults_parsed = await parseDomThPResultsFormat(test_seq, dom_presults_path);
let dompred_parsed = await parseDompredFormat(test_seq, dompred_path);
let featcfg_parsed = await parseFeatcfgFormat(featcfg_path);
let ffpredgo_parsed = await parseFFPredGOFormat(test_seq, ffpredgo_path);
let metpred_parsed = await parseMetpredFormat(pdb_seq_chain_A, "CU", metpred_path);
let hspred_parsed = await parseHSPredFormat(pdb_seq_chain_A, "A", hspred_path);
```
All these return a sequence object
Note that some require you pass in the sequence in single letter code, where
it can't be read/inferred from the results file.
Note metpred and hspred require further data to understand what data they must
parse from the file
